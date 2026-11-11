"use client";

import { File, Folder } from "lucide-react";
import { useState } from "react";

export default function FuelComparison() {
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
  return (
    <div className="p-6 mt-16 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h3 className="text-xl font-semibold md:max-w-3xs lg:max-w-full">
          燃料比較 -Rīsu・Nenryō Hikaku - Lease and Fuel Comparison
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
                <a> <Folder />2017</a>
              </li>
              <li>
                <a><Folder />2018</a>
              </li>
              <li>
                <a><Folder />2019</a>
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
                <a><File />January</a>
              </li>
              <li>
                <a><File />February</a>
              </li>
              <li>
                <a><File />March</a>
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

      {/* Company Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {companies.map((name, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCompany(name)}
            className={`border rounded px-4 py-1 text-sm ${
              selectedCompany === name
                ? "bg-gray-800 text-white dark:bg-white dark:text-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700 dark:hover:bg-neutral-700"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="mb-4 font-medium">{selectedCompany}</p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-neutral-700 text-sm text-left">
          <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white">
            <tr>
              <th className="p-2 border dark:border-neutral-700">Date</th>
              <th className="p-2 border dark:border-neutral-700">
                Ｒ2年度 (2020)
              </th>
              <th className="p-2 border dark:border-neutral-700">
                内廻送費 (Internal transfer)
              </th>
              <th className="p-2 border dark:border-neutral-700">
                Ｒ3年度 (2021)
              </th>
              <th className="p-2 border dark:border-neutral-700">
                （内廻送費）
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="p-2 border dark:border-neutral-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t pt-4 text-gray-600 dark:text-gray-400 dark:border-neutral-700">
        <span className="text-center mb-2 sm:mb-0">
          You are viewing first page of ティーワイエス (TYS)
        </span>
        <div className="flex gap-2">
          <button className="px-2 py-1 border rounded dark:border-neutral-700">
            ‹
          </button>
          <button className="px-2 py-1 border rounded dark:border-neutral-700">
            2
          </button>
          <button className="px-2 py-1 border rounded dark:border-neutral-700">
            3
          </button>
          <button className="px-2 py-1 border rounded dark:border-neutral-700">
            12
          </button>
          <button className="px-2 py-1 border rounded dark:border-neutral-700">
            ›
          </button>
        </div>
      </footer>
    </div>
  );
}
