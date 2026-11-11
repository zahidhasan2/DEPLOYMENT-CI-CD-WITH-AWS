'use client';

import {
  IconBrandTabler,
  IconSettings
} from "@tabler/icons-react";
import { BadgeDollarSign, Blend, ListTodo, TicketX } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Navbar from "./Navbar";

export function SidebarDemo({ children }) {
  const links = [
    {
      label: "features-1",
      href: "/",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "features-2",
      href: "/features-2", // use route path if using pages or app routing
      icon: <Blend className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "features-3",
      href: "features-3",
      icon: <ListTodo className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "features-4",
      href: "features-4",
      icon: <BadgeDollarSign className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "features-5",
      href: "invoice",
      icon: <TicketX className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row border border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Settings",
                href: "#",
                icon: (
                  <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Dashboard content area */}
      <div className="flex flex-1 flex-col bg-white dark:bg-neutral-900">
        <Navbar />
        <main className="p-4 overflow-y-auto h-full">{children}</main>
      </div>
    </div>
  );
}

export const Logo = () => (
  <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-pre font-medium text-black dark:text-white">
      Brand Logo
    </motion.span>
  </a>
);
export const LogoIcon = () => (
  <a
    href="#"
    aria-label="Home"
    title="Home"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
  </a>
);

