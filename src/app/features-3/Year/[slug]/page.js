"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserPanel from "../../../component/ui/userPanel";

export default function MonthlySheetPage({ params }) {
  const router = useRouter();
  const { slug } = params;

  // Parse the slug to get year and month
  const [year, month] = slug.split("-");

  const [tableData, setTableData] = useState([
    ["2024-01-01", "¥1,250,000", "¥150,000", "¥1,300,000", "¥160,000"],
    ["2024-01-02", "¥1,180,000", "¥140,000", "¥1,220,000", "¥155,000"],
    ["2024-01-03", "¥1,320,000", "¥165,000", "¥1,350,000", "¥170,000"],
    ["2024-01-04", "¥1,150,000", "¥135,000", "¥1,200,000", "¥150,000"],
    ["2024-01-05", "¥1,280,000", "¥160,000", "¥1,310,000", "¥165,000"],
  ]);

  const [currentView, setCurrentView] = useState("list");
  const [fontSize, setFontSize] = useState(16);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleBackClick = () => {
    router.back();
  };

  const addNewRow = () => {
    const newRow = ["", "", "", "", ""];
    setTableData([...tableData, newRow]);
  };

  const updateCell = (rowIndex, cellIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][cellIndex] = value;
    setTableData(newData);
  };

  const deleteRow = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  const handleRowSelection = (rowIndex) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowIndex)) {
      newSelectedRows.delete(rowIndex);
    } else {
      newSelectedRows.add(rowIndex);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === tableData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(tableData.map((_, index) => index)));
    }
  };

  const deleteSelectedRows = () => {
    const newData = tableData.filter((_, index) => !selectedRows.has(index));
    setTableData(newData);
    setSelectedRows(new Set());
  };

  const handleViewChange = (viewType) => {
    setCurrentView(viewType);
    console.log("View changed to:", viewType);
  };

  const handleAddNewSheet = () => {
    // This will add a new row to the current table
    addNewRow();
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    console.log("Font size changed to:", newSize);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 mt-10">
      <div className="mx-auto p-4">
        {/* User Panel */}
        <UserPanel
          onViewChange={handleViewChange}
          isInsideFolder={true}
          isDataView={true}
          onAddNewSheet={handleAddNewSheet}
          onFontSizeChange={handleFontSizeChange}
          fontSize={fontSize}
          onAddNewcolum={true}
        >
          
        </UserPanel>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white dark:bg-neutral-800 border border-neutral-600 shadow">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div>
              <h1 className="text-md font-bold text-gray-900 dark:text-white">
                {month} {year} - Monthly Sheet
              </h1>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRows.size} row(s) selected
              </span>
              <button
                onClick={deleteSelectedRows}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="min-w-full border border-gray-300 dark:border-neutral-700 text-sm text-left"
              style={{ fontSize: `${fontSize}px` }}
            >
              <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white">
                <tr>
                  <th className="p-2 border dark:border-neutral-700 w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === tableData.length && tableData.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </th>
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
                    className={`hover:bg-gray-100 dark:hover:bg-neutral-800 ${
                      selectedRows.has(rowIndex) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="p-2 border dark:border-neutral-700">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(rowIndex)}
                        onChange={() => handleRowSelection(rowIndex)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="p-2 border dark:border-neutral-700"
                      >
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            updateCell(rowIndex, cellIndex, e.target.value)
                          }
                          className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white"
                          placeholder={
                            cellIndex === 0 ? "YYYY-MM-DD" : "Enter value"
                          }
                          style={{ fontSize: `${fontSize}px` }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t pt-4 text-gray-600 dark:text-gray-400 dark:border-neutral-700">
          <span className="text-center mb-2 sm:mb-0">
            You are viewing {month} {year} sheet of ティーワイエス (TYS)
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
    </div>
  );
}
