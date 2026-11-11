# Deploying Next.js to EC2 with GitHub Actions, AWS OIDC and PM2

This guide explains how this project deploys itself to an AWS EC2 server, and
walks through every error we hit while setting it up and how we fixed it.

> All IDs, ARNs and account numbers below are **placeholders**. Replace them with
> your own values. Never commit real secrets to the repository.

Workflow file: [`.github/workflows/oidc.yml`](../.github/workflows/oidc.yml)

---

## 1. What the pipeline does

```
push to main
   │
   ▼
[ci job]      checkout → npm ci → lint → test → build
   │
   ▼
[deploy job]  GitHub OIDC token ──► AWS STS ──► temporary AWS credentials
                 │
                 ├─ find the EC2 instance's public IP
                 ├─ create a throwaway SSH key, push it with EC2 Instance Connect (valid 60s)
                 └─ SSH in → git reset to the commit → npm ci → build → pm2 reload
```

### Why OIDC?

The old way was to store `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` and a
permanent SSH private key in GitHub secrets. If those leak, an attacker has
access until you notice and rotate them.

With OIDC:

- GitHub gives each workflow run a short-lived signed token.
- AWS checks the token and hands back credentials that expire in about an hour.
- The SSH key is generated during the run and only works for 60 seconds.

Nothing long-lived is stored in GitHub except the role's ARN.

### Required permissions in the workflow

```yaml
permissions:
  id-token: write   # allows the job to request an OIDC token
  contents: read    # allows actions/checkout
```

Without `id-token: write` the job cannot get a token at all.

---

## 2. AWS setup (one time)

### 2.1 Add GitHub as an identity provider

IAM → **Identity providers** → Add provider → OpenID Connect

| Field | Value |
|---|---|
| Provider URL | `https://token.actions.githubusercontent.com` |
| Audience | `sts.amazonaws.com` |

### 2.2 Create the IAM role

**Trust policy** (who may assume the role):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": [
            "repo:<OWNER>/<REPO>:environment:production",
            "repo:<OWNER>/<REPO>:ref:refs/heads/main"
          ]
        }
      }
    }
  ]
}
```

> See [Problem 4](#problem-4-not-authorized-to-perform-stsassumerolewithwebidentity)
> before you copy this. The `sub` format may be different for your repo.

**Permissions policy** (what the role may do):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:DescribeInstances",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2-instance-connect:SendSSHPublicKey",
      "Resource": "arn:aws:ec2:<REGION>:<ACCOUNT_ID>:instance/<INSTANCE_ID>"
    }
  ]
}
```

### 2.3 EC2 instance

- It needs a public IP address.
- The Security Group must allow inbound port 22 from GitHub runners.
- EC2 Instance Connect is preinstalled on Ubuntu and Amazon Linux AMIs.

---

## 3. GitHub setup

Settings → **Environments** → `production`

| Type | Name | Example |
|---|---|---|
| Secret | `AWS_ROLE_ARN` | `arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>` |
| Variable | `EC2_INSTANCE_ID` | `i-0123456789abcdef0` |
| Variable | `AWS_REGION` | `eu-north-1` |
| Variable | `SSH_USER` | `ubuntu` (Ubuntu) or `ec2-user` (Amazon Linux) |
| Variable (optional) | `APP_DIR` | `/var/www/next-japan` |
| Variable (optional) | `APP_PORT` | `3000` |

Using the CLI:

```bash
gh secret   set AWS_ROLE_ARN    --env production --body "arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>"
gh variable set EC2_INSTANCE_ID --env production --body "<INSTANCE_ID>"
gh variable set AWS_REGION      --env production --body "<REGION>"
gh variable set SSH_USER        --env production --body "ubuntu"
```

---

## 4. Problems we hit and how we solved them

### Problem 1: the first workflow file did not run at all

The original `ci-cd.yml` had several small mistakes. Any one of them breaks
the workflow.

| Mistake | Fix |
|---|---|
| `jobs:` was indented under `concurrency:` | `jobs:` must start at column 0 |
| `uses: action/setup-node@v4` | `actions/setup-node@v4` (plural) |
| `with: {node-version:20}` | YAML needs a space after the colon: `node-version: 20` |
| `refs/head/main` | `refs/heads/main` |
| `github.event_name = 'push'` | Comparison uses `==` |
| `enviroment: production` | `environment` |
| `npx tsc --noEmit` | This is a JavaScript project with no TypeScript installed, so we use `npm run lint` + `npm run build` instead |

**Lesson:** YAML is whitespace-sensitive and GitHub does not always give a
clear error. Paste the file into a YAML validator when something silently
does not run.

---

### Problem 2: `The policy failed legacy parsing`

**Where:** creating the permissions policy in the IAM console.

**Cause:** the policy was copied from an example and still contained
placeholders like `<REGION>`, `<ACCOUNT_ID>`, `<INSTANCE_ID>`. AWS cannot parse
`<` and `>` inside an ARN.

**Fix:** replace every placeholder with real values. To find them:

- **Account ID:** click your name in the top-right of the console (12 digits).
- **Region:** the region code at the top of the EC2 console, e.g. `eu-north-1`.
- **Instance ID:** EC2 → Instances, starts with `i-`.

---

### Problem 3: `Credentials could not be loaded, please check your action inputs: Could not load credentials from any providers`

**Where:** the `aws-actions/configure-aws-credentials@v4` step.

**Cause:** the `AWS_ROLE_ARN` secret did not exist. The action received an
empty `role-to-assume`, so it skipped OIDC and looked for access keys, found
none, and gave up.

**How we found it:**

```bash
gh secret list                    # repository secrets
gh secret list --env production   # environment secrets
gh variable list --env production
```

Only the old SSH secrets were there. No `AWS_ROLE_ARN`, no `EC2_INSTANCE_ID`.

**Fix:** add the secret and variables to the `production` environment
(see [section 3](#3-github-setup)).

**Lesson:** this message almost always means "the role ARN is empty or
misspelled". It is not a permissions problem.

---

### Problem 4: `Not authorized to perform sts:AssumeRoleWithWebIdentity`

**Where:** same step, after adding the secret.

This error means the request reached AWS, but the role's **trust policy** did
not match the token GitHub sent. The thing to compare is the token's `sub`
(subject) claim.

#### Attempt 1: wrong `sub` because of the environment

When a job uses `environment: production`, GitHub sets:

```
sub = repo:<OWNER>/<REPO>:environment:production
```

not `repo:<OWNER>/<REPO>:ref:refs/heads/main`. The AWS console wizard creates
the branch form by default. We added both forms to the trust policy.

**It still failed.**

#### Attempt 2: the real cause, immutable subject

We checked the repository's OIDC settings:

```bash
gh api repos/<OWNER>/<REPO>/actions/oidc/customization/sub
```

Result:

```json
{
  "use_default": true,
  "use_immutable_subject": true,
  "sub_claim_prefix": "repo:<OWNER>@<OWNER_ID>/<REPO>@<REPO_ID>"
}
```

`use_immutable_subject: true` means GitHub puts the **numeric IDs** of the
owner and the repo into `sub`:

```
repo:<OWNER>@<OWNER_ID>/<REPO>@<REPO_ID>:environment:production
```

So the trust policy has to use that exact format:

```json
"StringLike": {
  "token.actions.githubusercontent.com:sub": [
    "repo:<OWNER>@<OWNER_ID>/<REPO>@<REPO_ID>:environment:production",
    "repo:<OWNER>@<OWNER_ID>/<REPO>@<REPO_ID>:ref:refs/heads/main"
  ]
}
```

**Why IDs are better:** if someone deletes your repo and creates a new one with
the same name, it gets a different ID and cannot assume your role.

**Lesson:** never guess the `sub` value. Run the `gh api` command above and
copy `sub_claim_prefix` from the output.

#### Red herring: `7 role session tags are being used`

This line appears in the debug log. It is harmless and does not cause the
error. `AssumeRoleWithWebIdentity` does not send those tags.

#### Tip: check whether the role was ever used

IAM → Roles → your role → **Last activity**. If it shows `-`, AWS has never
accepted a token for this role, so the problem is still in the trust policy.

---

## 5. Troubleshooting checklist

| Error | Most likely cause |
|---|---|
| `Could not load credentials from any providers` | `AWS_ROLE_ARN` secret missing or empty |
| `Not authorized to perform sts:AssumeRoleWithWebIdentity` | `sub` in trust policy does not match (check immutable subject) |
| `No OpenIDConnect provider found` | Identity provider not created in IAM |
| `Resolve EC2 host` fails | Wrong `AWS_REGION`, or the instance has no public IP |
| `ssh-keyscan` / SSH times out | Security Group does not allow port 22 |
| `Permission denied (publickey)` | Wrong `SSH_USER`, or the 60-second key window expired |
| `npm: command not found` on the server | Node is not on PATH for non-interactive SSH (the script loads nvm/fnm or installs Node 20) |
| `cannot write to /var/www/...` | Run once on the server: `sudo mkdir -p /var/www/next-japan && sudo chown -R $USER:$USER /var/www/next-japan` |

---

## 6. What not to commit

- AWS access keys or secret keys
- Private SSH keys
- Real account IDs, role ARNs and instance IDs in public docs (keep them in
  GitHub secrets/variables)
- `.env` files
