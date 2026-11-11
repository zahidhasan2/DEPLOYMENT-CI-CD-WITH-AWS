"use client";

import { ChevronLeft, ChevronRight, File, Folder } from "lucide-react";
import React, { useState } from "react";
const tasks = [
  {
    id: 2,
    name: "API Integration",
    project: "Beta",
    assignee: "John Smith",
    status: "Completed",
    start: "2024-02-01",
    end: "2024-02-05",
    hours: 28,
    client: "ABC Ltd",
    location: "Osaka",
    remarks: "Integrated with v3 endpoints",
    manager: "Susan",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Dashboard Setup",
    project: "Gamma",
    assignee: "Alice Brown",
    status: "Completed",
    start: "2024-03-10",
    end: "2024-03-14",
    hours: 40,
    client: "Delta Inc",
    location: "Nagoya",
    remarks: "Initial analytics view",
    manager: "Henry",
    priority: "High",
  },
  {
    id: 4,
    name: "UI Redesign",
    project: "Alpha",
    assignee: "Tom Hanks",
    status: "Completed",
    start: "2024-04-01",
    end: "2024-04-07",
    hours: 36,
    client: "VisionSoft",
    location: "Tokyo",
    remarks: "Improved user journey",
    manager: "Linda",
    priority: "Medium",
  },
  {
    id: 5,
    name: "Database Migration",
    project: "Beta",
    assignee: "Rita Hayworth",
    status: "Completed",
    start: "2024-04-10",
    end: "2024-04-15",
    hours: 45,
    client: "DataMove Ltd",
    location: "Osaka",
    remarks: "Moved to PostgreSQL",
    manager: "Ken",
    priority: "High",
  },
  {
    id: 6,
    name: "SEO Optimization",
    project: "Zeta",
    assignee: "Marcus Reed",
    status: "Completed",
    start: "2024-05-01",
    end: "2024-05-04",
    hours: 20,
    client: "MarketSharp",
    location: "Kyoto",
    remarks: "Improved SERP ranking",
    manager: "Susan",
    priority: "Low",
  },
  {
    id: 7,
    name: "Feature Rollout",
    project: "Omega",
    assignee: "Rachel Green",
    status: "Completed",
    start: "2024-05-20",
    end: "2024-05-23",
    hours: 32,
    client: "DevOps Co.",
    location: "Yokohama",
    remarks: "Released beta features",
    manager: "Henry",
    priority: "Medium",
  },
  {
    id: 8,
    name: "Security Audit",
    project: "Delta",
    assignee: "Steve Rogers",
    status: "Completed",
    start: "2024-06-01",
    end: "2024-06-06",
    hours: 38,
    client: "SecureTech",
    location: "Fukuoka",
    remarks: "No critical flaws found",
    manager: "Karen",
    priority: "High",
  },
  {
    id: 9,
    name: "System Monitoring",
    project: "Lambda",
    assignee: "Bruce Wayne",
    status: "Completed",
    start: "2024-06-15",
    end: "2024-06-18",
    hours: 24,
    client: "CloudCore",
    location: "Sapporo",
    remarks: "Set up Grafana dashboards",
    manager: "Linda",
    priority: "Medium",
  },
  {
    id: 10,
    name: "Accessibility Review",
    project: "Gamma",
    assignee: "Diana Prince",
    status: "Completed",
    start: "2024-07-05",
    end: "2024-07-09",
    hours: 30,
    client: "UXFirst",
    location: "Nagasaki",
    remarks: "WCAG compliance ensured",
    manager: "Henry",
    priority: "Low",
  },
  {
    id: 11,
    name: "Cloud Deployment",
    project: "Sigma",
    assignee: "Clark Kent",
    status: "Completed",
    start: "2024-07-15",
    end: "2024-07-20",
    hours: 42,
    client: "InfraBase",
    location: "Kobe",
    remarks: "Moved to AWS ECS",
    manager: "Ken",
    priority: "High",
  },
  {
    id: 12,
    name: "Internal Tooling",
    project: "Theta",
    assignee: "Natasha Romanoff",
    status: "Completed",
    start: "2024-08-01",
    end: "2024-08-04",
    hours: 28,
    client: "TechSuite",
    location: "Hiroshima",
    remarks: "Improved productivity",
    manager: "Susan",
    priority: "Medium",
  },
  {
    id: 13,
    name: "Performance Testing",
    project: "Beta",
    assignee: "Peter Parker",
    status: "Completed",
    start: "2024-08-10",
    end: "2024-08-13",
    hours: 26,
    client: "CodeFlex",
    location: "Nagoya",
    remarks: "Handled 10K concurrent users",
    manager: "Karen",
    priority: "High",
  },
  // Add other task objects here...
];

export default function WorkTable() {
    const [selectedCompany, setSelectedCompany] =
    useState("ティーワイエス (TYS)");
  const companies = [
    "ティーワイエス (TYS)",
    "中央リース(Chūō Rīsu-Leasing and Rental )",
    "森谷リース(森谷商会）Moriya Rīsu-Moriya Lease",
    "フジケン-Fujiken",
    "その他（東建リース他）-Sono hoka (Tōken Rīsu hoka)-(Including Token Lease, etc.)",
  ];

  const tableData = [
    ["1", "833,897", "400,000", "400,000", "627,000"],
    ["2", "399,000", "400,000", "833,897", "400,000"],
    ["3", "627,000", "324,980", "399,000", "324,980"],
    ["4", "235,000", "56754767", "1,158,877", "635,000"],
    ["5", "627,000", "399,000", "399,000", "779,425"],
    ["6", "460,000", "1,095,000", "1,938,302", "1,095,000"],
    ["7", "627,000", "627,000", "399,000", "614,021"],
    ["8", "371,500", "627,000", "399,000", "2,552,323"],
    ["9", "1,466,500", "627,000", "399,000", "833,897"],
    ["10", "400,000", "324,980", "235,000", "1,158,877"],
    ["11", "635,000", "779,425", "460,000", "1,938,302"],
    ["12", "1,095,000", "614,021", "371,500", "2,552,323"],
    ["13", "1,095,000", "614,021", "371,500", "2,552,323"],
  ];
  const [fontSize, setFontSize] = useState(16);

  const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24];
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDate, setSelectedDate] = useState("");

  const years = ["2022", "2023", "2024", "2025"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full px-4 py-6 mt-10">
      <div className="">
        <div className="p-2">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h3 className="text-xl font-semibold md:max-w-3xs lg:max-w-full">
            List of Completed Work for January, 2025
            </h3>
            <div className="flex items-center p-2 dark:bg-neutral-700 bg-white gap-3">
              {/* Font Size Control */}
              <div className="flex items-center">
                <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                  <button
                    tabIndex={0}
                    className="btn bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-sm rounded-r-none"
                  >
                    Font size ▼
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu text-sm text-black dark:text-white bg-gray-100 dark:bg-neutral-700 rounded-box z-10 w-20 p-2 shadow"
                  >
                    {fontSizes.map((size) => (
                      <li key={size}>
                        <button
                          onClick={() => setFontSize(size)}
                          className={`w-full px-2 py-1 text-center hover:bg-gray-200 dark:hover:bg-neutral-600 ${
                            fontSize === size ? "font-bold" : ""
                          }`}
                        >
                          {size}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-16 text-center border border-neutral-900 rounded-l-none px-2 py-2 text-sm dark:bg-neutral-800 dark:text-white focus:outline-none"
                  min={6}
                  max={72}
                />
              </div>

              {/* Year Dropdown */}
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <button
                  tabIndex={0}
                  className="btn bg-red-600 text-white px-4 py-2 rounded"
                >
                  Year ▼
                </button>
                <ul className="dropdown-content menu text-black dark:text-white bg-gray-100 dark:bg-neutral-700 rounded-box z-10 w-40 p-2 shadow">
                  <li>
                    <a>
                      {" "}
                      <Folder />
                      2017
                    </a>
                  </li>
                  <li>
                    <a>
                      <Folder />
                      2018
                    </a>
                  </li>
                  <li>
                    <a>
                      <Folder />
                      2019
                    </a>
                  </li>
                </ul>
              </div>

              {/* Month Dropdown */}
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <button
                  tabIndex={0}
                  className="btn bg-red-600 text-white px-4 py-2 rounded"
                >
                  Month ▼
                </button>
                <ul className="dropdown-content menu text-black dark:text-white bg-gray-100 dark:bg-neutral-700 rounded-box z-10 w-40 p-2 shadow">
                  <li>
                    <a>
                      <File />
                      January
                    </a>
                  </li>
                  <li>
                    <a>
                      <File />
                      February
                    </a>
                  </li>
                  <li>
                    <a>
                      <File />
                      March
                    </a>
                  </li>
                </ul>
              </div>
              {/* Company Dropdown */}
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <button
                  tabIndex={0}
                  className="btn bg-green-600 text-white px-4 py-2 rounded"
                >
                  Company ▼
                </button>
                <ul className="dropdown-content menu text-black dark:text-white bg-gray-100 dark:bg-neutral-700 rounded-box z-10 w-40 p-2 shadow">
                  {companies.map((company, idx) => (
                    <li key={idx}>
                      <button
                        className={`w-full text-left px-2 py-1 hover:bg-gray-200 dark:hover:bg-neutral-600 ${
                          selectedCompany === company ? "font-bold" : ""
                        }`}
                        onClick={() => setSelectedCompany(company)}
                      >
                        {company}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-neutral-700 text-sm text-left">
              <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white">
                <tr className="text-left">
                  <th className="p-2 border dark:border-neutral-700">
                    Task Name
                  </th>
                  <th className="p-2 border dark:border-neutral-700">Date</th>
                  <th className="p-2 border dark:border-neutral-700">
                    Project
                  </th>
                  <th className="p-2 border dark:border-neutral-700">
                    Assignee
                  </th>
                  <th className="p-2 border dark:border-neutral-700">Status</th>
                  <th className="p-2 border dark:border-neutral-700">
                    Start Date
                  </th>
                  <th className="p-2 border dark:border-neutral-700">
                    End Date
                  </th>
                  <th className="p-2 border dark:border-neutral-700">Hours</th>
                  <th className="p-2 border dark:border-neutral-700">Client</th>
                  <th className="p-2 border dark:border-neutral-700">
                    Location
                  </th>
                  <th className="p-2 border dark:border-neutral-700">
                    Remarks
                  </th>
                  <th className="p-2 border dark:border-neutral-700">
                    Manager
                  </th>
                  <th className="p-2 border dark:border-neutral-700">
                    Priority
                  </th>
                  <th className="p-2 border dark:border-neutral-700">
                    Attachment
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <tr className="hover:bg-gray-100 dark:hover:bg-neutral-800">
                      <td className="p-2 border dark:border-neutral-700">
                        {task.id}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.name}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.project}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.assignee}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {task.status}
                        </span>
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.start}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.end}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.hours}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.client}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.location}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.remarks}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.manager}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        {task.priority}
                      </td>
                      <td className="p-2 border dark:border-neutral-700">
                        <i className="mdi mdi-file-document"></i>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 py-4 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between text-center text-sm text-neutral-600 dark:text-neutral-400 gap-3">
        {/* Left Text */}
        <span>
          You are viewing the first page of <strong>ティーワイエス (TYS)</strong>
        </span>

        {/* Pagination Group */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="border border-neutral-300 dark:border-neutral-600 px-3 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="border border-neutral-300 dark:border-neutral-600 px-3 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
            2
          </button>
          <button className="border border-neutral-300 dark:border-neutral-600 px-3 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
            3
          </button>
          <button className="border border-neutral-300 dark:border-neutral-600 px-3 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
            12
          </button>
          <button
            type="button"
            className="border border-neutral-300 dark:border-neutral-600 px-3 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      </footer>
      </div>
    </div>
  );
}
