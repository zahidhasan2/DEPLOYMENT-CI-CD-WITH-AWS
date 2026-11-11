// components/DashboardContent.js
import {
    ArrowDownLeft,
    ArrowUpRight,
    Clock,
    CloudDownload,
    Codepen,
    FileText,
    MailOpen,
    Monitor,
    PieChart,
    Wallet
} from 'lucide-react';
const DashboardContent = () => {
  return (
    <div className="main-panel">
      <div className="content-wrapper p-4 md:p-6 lg:p-8 mt-14">
        {" "}
        {/* Added padding for content wrapper */}
        <div className="space-y-10">
          {/* Financial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                amount: "$12.34",
                change: "+3.5%",
                positive: true,
                label: "Potential growth",
              },
              {
                amount: "$17.34",
                change: "+11%",
                positive: true,
                label: "Revenue current",
              },
              {
                amount: "$12.34",
                change: "-2.4%",
                positive: false,
                label: "Daily Income",
              },
              {
                amount: "$31.53",
                change: "+3.5%",
                positive: true,
                label: "Expense current",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white text-primary dark:text-white   dark:bg-neutral-700 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold">{item.amount}</h3>
                    <p
                      className={`ml-2 text-sm font-medium ${
                        item.positive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.change}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {item.positive ? (
                      <ArrowUpRight className="text-green-500 w-5 h-5" />
                    ) : (
                      <ArrowDownLeft className="text-red-500 w-5 h-5" />
                    )}
                  </div>
                </div>
                <h6 className="text-sm text-gray-700 dark:text-gray-400 ">{item.label}</h6>
              </div>
            ))}
          </div>

          {/* Transaction History + Open Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Transaction History */}
            <div className="lg:col-span-4 bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6 text-black dark:text-white">
              <h4 className="text-lg font-bold mb-4">Transaction History</h4>
              <canvas
                id="transaction-history"
                className="w-full h-40 mb-4"
              ></canvas>
              {[
                {
                  title: "Transfer to Paypal",
                  date: "07 Jan 2019, 09:12AM",
                  amount: "$236",
                },
                {
                  title: "Transfer to Stripe",
                  date: "07 Jan 2019, 09:12AM",
                  amount: "$593",
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-100 py-3 px-4 rounded-md mb-3"
                >
                  <div>
                    <h6 className="text-base text-black font-semibold">{t.title}</h6>
                    <p className="text-sm text-gray-500">{t.date}</p>
                  </div>
                  <h6 className="text-lg font-bold">{t.amount}</h6>
                </div>
              ))}
            </div>

            {/* Open Projects */}
            <div className="lg:col-span-8 bg-white dark:bg-neutral-700 rounded-lg shadow-md p-6">
              <div className="flex justify-between mb-4">
                <h4 className="text-lg font-bold">Open Projects</h4>
                <p className="text-gray-500">Your data status</p>
              </div>
              {[
                {
                  icon: <FileText className="text-blue-500" />,
                  title: "Admin dashboard design",
                  desc: "Broadcast web app mockup",
                  time: "15 minutes ago",
                  meta: "30 tasks, 5 issues",
                },
                {
                  icon: <CloudDownload className="text-green-500" />,
                  title: "Wordpress Development",
                  desc: "Upload new design",
                  time: "1 hour ago",
                  meta: "23 tasks, 5 issues",
                },
                {
                  icon: <Clock className="text-cyan-500" />,
                  title: "Project meeting",
                  desc: "New project discussion",
                  time: "35 minutes ago",
                  meta: "15 tasks, 2 issues",
                },
                {
                  icon: <MailOpen className="text-red-500" />,
                  title: "Broadcast Mail",
                  desc: "Sent release details to team",
                  time: "55 minutes ago",
                  meta: "35 tasks, 7 issues",
                },
                {
                  icon: <PieChart className="text-yellow-500" />,
                  title: "UI Design",
                  desc: "New application planning",
                  time: "50 minutes ago",
                  meta: "27 tasks, 4 issues",
                },
              ].map((proj, idx) => (
                <div
                  key={idx}
                  className="flex items-center border-b last:border-b-0 py-4"
                >
                  <div className="mr-4">{proj.icon}</div>
                  <div className="flex-grow">
                    <h6 className="font-semibold text-base">{proj.title}</h6>
                    <p className="text-sm text-gray-500">{proj.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{proj.time}</p>
                    <p className="text-sm text-gray-500">{proj.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue, Sales, Purchase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Revenue",
                amount: "$32,123",
                change: "+3.5%",
                trend: "11.38% Since last month",
                icon: <Codepen className="text-blue-500 text-3xl" />,
                up: true,
              },
              {
                title: "Sales",
                amount: "$45,850",
                change: "+8.3%",
                trend: "9.61% Since last month",
                icon: <Wallet className="text-red-500 text-3xl" />,
                up: true,
              },
              {
                title: "Purchase",
                amount: "$2,039",
                change: "-2.1%",
                trend: "2.27% Since last month",
                icon: <Monitor className="text-green-500 text-3xl" />,
                up: false,
              },
            ].map((card, idx) => (
              <div key={idx} className="bg-white  dark:bg-neutral-700 rounded-lg shadow-md p-6">
                <h5 className="text-base font-bold mb-4">{card.title}</h5>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold">{card.amount}</h2>
                      <p
                        className={`ml-2 text-sm font-medium ${
                          card.up ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {card.change}
                      </p>
                    </div>
                    <h6 className="text-sm text-gray-500">{card.trend}</h6>
                  </div>
                  <div className="text-right">{card.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Order Status Table */}
        {/* <div className="mb-8 grid grid-cols-12">
          <div className="col-span-12 stretch-card">
            <div className="card bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-bold mb-4">Order Status</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label flex items-center">
                            <input
                              type="checkbox"
                              className="form-check-input h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order No
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Cost
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Mode
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label flex items-center">
                            <input
                              type="checkbox"
                              className="form-check-input h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap flex items-center">
                        <Image
                          src="/assets/images/faces/face1.jpg"
                          alt="Henry Klein"
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <span className="text-sm">Henry Klein</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        02312
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        $14,500
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Dashboard
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Credit card
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        04 Dec 2019
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="badge badge-outline-success px-3 py-1 text-xs rounded-full">
                          Approved
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label flex items-center">
                            <input
                              type="checkbox"
                              className="form-check-input h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap flex items-center">
                        <Image
                          src="/assets/images/faces/face2.jpg"
                          alt="Estella Bryan"
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <span className="text-sm">Estella Bryan</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        02312
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        $14,500
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Website
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Cash on delivered
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        04 Dec 2019
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="badge badge-outline-warning px-3 py-1 text-xs rounded-full">
                          Pending
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label flex items-center">
                            <input
                              type="checkbox"
                              className="form-check-input h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap flex items-center">
                        <Image
                          src="/assets/images/faces/face5.jpg"
                          alt="Lucy Abbott"
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <span className="pl-2 text-sm">Lucy Abbott</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        02312
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        $14,500
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        App design
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Credit card
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        04 Dec 2019
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="badge badge-outline-danger px-3 py-1 text-xs rounded-full">
                          Rejected
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label flex items-center">
                            <input
                              type="checkbox"
                              className="form-check-input h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap flex items-center">
                        <Image
                          src="/assets/images/faces/face3.jpg"
                          alt="Peter Gill"
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <span className="pl-2 text-sm">Peter Gill</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        02312
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        $14,500
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Development
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Online Payment
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        04 Dec 2019
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="badge badge-outline-success px-3 py-1 text-xs rounded-full">
                          Approved
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label flex items-center">
                            <input
                              type="checkbox"
                              className="form-check-input h-4 w-4 text-blue-600 border-gray-00 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap flex items-center">
                        <Image
                          src="/assets/images/faces/face4.jpg"
                          alt="Sallie Reyes"
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <span className="pl-2 text-sm">Sallie Reyes</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        02312
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        $14,500
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Website
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Credit card
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        04 Dec 2019
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="badge badge-outline-success px-3 py-1 text-xs rounded-full">
                          Approved
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
        {/* Messages and Portfolio Slide */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-6 xl:col-span-4 stretch-card">
            <div className="card bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">Messages</h4>
                <p className="text-gray-500 text-sm">View all</p>
              </div>
              <div className="preview-list">
                <div className="preview-item border-b border-gray-200 py-4 flex items-center">
                  <div className="preview-thumbnail mr-4 flex-shrink-0">
                    <Image
                      src="/assets/images/faces/face6.jpg"
                      alt="Leonard"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="preview-item-content flex flex-grow">
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row xl:flex-row justify-between items-start md:items-center xl:items-center">
                        <h6 className="preview-subject text-base font-semibold mb-1 md:mb-0">
                          Leonard
                        </h6>
                        <p className="text-gray-500 text-xs">5 minutes ago</p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Well, it seems to be working now.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-b border-gray-200 py-4 flex items-center">
                  <div className="preview-thumbnail mr-4 flex-shrink-0">
                    <Image
                      src="/assets/images/faces/face8.jpg"
                      alt="Luella Mills"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="preview-item-content flex flex-grow">
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row xl:flex-row justify-between items-start md:items-center xl:items-center">
                        <h6 className="preview-subject text-base font-semibold mb-1 md:mb-0">
                          Luella Mills
                        </h6>
                        <p className="text-gray-500 text-xs">10 Minutes Ago</p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Well, it seems to be working now.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-b border-gray-200 py-4 flex items-center">
                  <div className="preview-thumbnail mr-4 flex-shrink-0">
                    <Image
                      src="/assets/images/faces/face9.jpg"
                      alt="Ethel Kelly"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="preview-item-content flex flex-grow">
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row xl:flex-row justify-between items-start md:items-center xl:items-center">
                        <h6 className="preview-subject text-base font-semibold mb-1 md:mb-0">
                          Ethel Kelly
                        </h6>
                        <p className="text-gray-500 text-xs">2 Hours Ago</p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Please review the tickets
                      </p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-b border-gray-200 py-4 flex items-center">
                  <div className="preview-thumbnail mr-4 flex-shrink-0">
                    <Image
                      src="/assets/images/faces/face11.jpg"
                      alt="Herman May"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="preview-item-content flex flex-grow">
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row xl:flex-row justify-between items-start md:items-center xl:items-center">
                        <h6 className="preview-subject text-base font-semibold mb-1 md:mb-0">
                          Herman May
                        </h6>
                        <p className="text-gray-500 text-xs">4 Hours Ago</p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Thanks a lot. It was easy to fix it .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-4 stretch-card">
            <div className="card bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-bold mb-4">Portfolio Slide</h4>
              {/* Note: Owl Carousel is a JavaScript library. To use it in Next.js,
                   you'd typically import it dynamically or use a React-specific carousel library.
                   For this example, we'll just render the images statically. */}
              {/* <div className="relative overflow-hidden rounded-lg">
                <div className="item w-full">
                  <Image
                    src="/assets/images/dashboard/Rectangle.jpg"
                    alt="Portfolio Image 1"
                    width={600} // Adjust based on your design needs
                    height={400} // Adjust based on your design needs
                    layout="responsive"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="item w-full mt-4">
                  {" "}
                  {/* Added margin for static display */}
                  {/* <Image
                    src="/assets/images/dashboard/Img_5.jpg"
                    alt="Portfolio Image 2"
                    width={600}
                    height={400}
                    layout="responsive"
                    className="w-full h-auto object-cover"
                  />
                </div> */}
                {/* You can add more portfolio items here */}
              {/* </div>
            </div>
          </div> */}
          {/* The original HTML was truncated, so I've stopped here. */}
          {/* If there's more content, you'd continue converting it to Tailwind and React components. */}
        {/* </div> */} 
      </div>
    </div>
  );
};

export default DashboardContent;
