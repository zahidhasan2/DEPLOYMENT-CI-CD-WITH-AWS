"use client";
import { BarChart3, FunnelPlus, Grid3X3, List, ListTodo } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react"; // Added missing import for React

export default function UserPanel({ children, onViewChange, isInsideFolder = false, onAddNewSheet, onFontSizeChange, fontSize = 16, isDataView = false, isAnalytics = true ,onAddNewcolum=false}) {
  console.log("user pannel render");
  const [currentView, setCurrentView] = useState("list"); // "list", "grid", "list-info"

  const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24];
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const years = [
    "filter option 1",
    "filter option 2",
    "filter option 3",
    "filter option 4",
  ];
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

  const companies = ["Company A", "Company B", "Company C", "Company D"];

  const viewOptions = [
    {
      id: "list",
      name: "List View",
      icon: List,
      description: "Simple list layout"
    },
    {
      id: "grid",
      name: "Grid View",
      icon: Grid3X3,
      description: "Big icon layout"
    },
    {
      id: "list-info",
      name: "List with Info",
      icon: ListTodo,
      description: "Detailed list with info"
    }
  ];

  const handleViewChange = (viewType) => {
    setCurrentView(viewType);
    if (onViewChange) {
      onViewChange(viewType);
    }
  };

  const handleAddButtonClick = () => {
    if (isInsideFolder && onAddNewSheet) {
      onAddNewSheet();
    } else {
      // Handle create new folder logic
      console.log("Create new folder");
    }
  };

  const handleFontSizeChange = (newSize) => {
    if (onFontSizeChange) {
      onFontSizeChange(newSize);
    }
  };

  const getButtonText = () => {
    if (isDataView) {
      return "+ Add new row";
    } else if (isInsideFolder) {
      return "+ Create new sheet";
    } else {
      return "+ Create new folder";
    }
  };

  return (
    <div className="flex justify-between bg-gray-300 items-center dark:bg-neutral-800 text-black dark:text-white p-2 border dark:border-neutral-600 border-gray-400 gap-4">
      <div className="flex items-center justify-between gap-4">
        <button 
          className="btn bg-green-700"
          onClick={handleAddButtonClick}
        >
          {getButtonText()}
        </button>
        {onAddNewcolum && <button 
          className="btn bg-green-700"
          onClick={handleAddButtonClick}
        >
          + Add new Column
        </button> }
        {children}

       

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
                    onClick={() => handleFontSizeChange(size)}
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
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
            className="w-16 text-center border border-neutral-900 rounded-l-none px-2 py-2 text-sm dark:bg-neutral-800 dark:text-white focus:outline-none"
            min={6}
            max={72}
          />
        </div>

        {/* View Toggle Dropdown */}
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-start">
          <button
            tabIndex={0}
            className="btn bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            {viewOptions.find(v => v.id === currentView)?.icon && 
              React.createElement(viewOptions.find(v => v.id === currentView).icon, { size: 16 })
            }
            View ▼
          </button>
          <ul className="dropdown-content menu text-black dark:text-white bg-gray-100 dark:bg-neutral-700 rounded-box z-10 w-48 p-2 shadow">
            {viewOptions.map((view) => (
              <li key={view.id}>
                <button
                  className={`w-full text-left px-3 py-2 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded flex items-center gap-3 ${
                    currentView === view.id ? "bg-blue-100 dark:bg-blue-900 font-semibold" : ""
                  }`}
                  onClick={() => handleViewChange(view.id)}
                >
                  {React.createElement(view.icon, { size: 18 })}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{view.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{view.description}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* filter Dropdown */}
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-start">
          <button
            tabIndex={0}
            className="btn bg-neutral-700 text-white px-4 py-2 rounded"
          >
            <FunnelPlus />▼
          </button>
          <ul className="dropdown-content menu text-black dark:text-white bg-gray-100 dark:bg-neutral-700 rounded-box z-10 w-40 p-2 shadow">
            {years.map((year) => (
              <li key={year}>
                <button
                  className={`w-full text-left px-2 py-1 hover:bg-gray-200 dark:hover:bg-neutral-600 ${
                    selectedYear === year ? "font-bold" : ""
                  }`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
         {/* Analytics Button */}
         {isAnalytics && (
          <Link
            href="/analytics"
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Analytics</span>
          </Link>
        )}
      </div>

      <form className="flex w-full  max-w-[12rem] lg:max-w-[18rem]">
        <input
          type="text"
          placeholder="Search "
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm outline-none"
        />
      </form>
    </div>
  );
}
