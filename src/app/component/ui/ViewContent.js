"use client";
import { ArrowLeft, Calendar, File, Folder, MoreVertical, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewContent({ viewMode = "list", onFolderOpen, currentPath = [], onBackToParent, onAddNewSheet }) {
  const [currentFolder, setCurrentFolder] = useState(null);
  const router = useRouter();

  // Sample data for demonstration
  const yearFolders = [
    {
      id: 1,
      name: "2018",
      type: "folder",
      modified: "2024-01-15",
      owner: "John Doe",
      description: "2018 data and documents"
    },
    {
      id: 2,
      name: "2019",
      type: "folder",
      modified: "2024-01-10",
      owner: "Jane Smith",
      description: "2019 data and documents"
    },
    {
      id: 3,
      name: "2020",
      type: "folder",
      modified: "2024-01-08",
      owner: "Mike Johnson",
      description: "2020 data and documents"
    },
    {
      id: 4,
      name: "2021",
      type: "folder",
      modified: "2024-01-12",
      owner: "Sarah Wilson",
      description: "2021 data and documents"
    },
    {
      id: 5,
      name: "2022",
      type: "folder",
      modified: "2024-01-05",
      owner: "Alex Brown",
      description: "2022 data and documents"
    },
    {
      id: 6,
      name: "2023",
      type: "folder",
      modified: "2024-01-14",
      owner: "David Lee",
      description: "2023 data and documents"
    },
    {
      id: 7,
      name: "2024",
      type: "folder",
      modified: "2024-01-20",
      owner: "Emily Chen",
      description: "2024 data and documents"
    },
    {
      id: 8,
      name: "2025",
      type: "folder",
      modified: "2024-01-22",
      owner: "Tom Wilson",
      description: "2025 data and documents"
    }
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder);
    if (onFolderOpen) {
      onFolderOpen(folder);
    }
  };

  const handleBackClick = () => {
    setCurrentFolder(null);
    if (onBackToParent) {
      onBackToParent();
    }
  };

  const handleSheetClick = (month) => {
    if (currentFolder) {
      const slug = `${currentFolder.name}-${month}`;
      router.push(`/features-3/Year/${slug}`);
    }
  };

  const handleAddNewSheet = () => {
    if (onAddNewSheet) {
      onAddNewSheet(currentFolder);
    }
  };

  const renderMonthSheets = () => {
    const monthSheets = months.map((month, index) => ({
      id: index + 1,
      name: month,
      type: "file",
      modified: "2024-01-15",
      owner: currentFolder?.owner || "Unknown",
      description: `${month} sheet for ${currentFolder?.name}`,
      sheetType: "spreadsheet"
    }));

    switch (viewMode) {
      case "grid":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {monthSheets.map((sheet) => (
              <div
                key={sheet.id}
                className="flex flex-col items-center p-4 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer text-center"
                onClick={() => handleSheetClick(sheet.name)}
              >
                <File className="text-green-500 mb-2" size={48} />
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate w-full">
                  {sheet.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Sheet
                </span>
              </div>
            ))}
          </div>
        );

      case "list-info":
        return (
          <div className="space-y-3">
            {monthSheets.map((sheet) => (
              <div
                key={sheet.id}
                className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                onClick={() => handleSheetClick(sheet.name)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <File className="text-green-500 mt-1" size={24} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {sheet.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {sheet.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{sheet.modified}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          <span>{sheet.owner}</span>
                        </div>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                          Spreadsheet
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default: // list view
        return (
          <div className="space-y-2">
            {monthSheets.map((sheet) => (
              <div
                key={sheet.id}
                className="flex items-center p-3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                onClick={() => handleSheetClick(sheet.name)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <File className="text-green-500" size={20} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {sheet.name}
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                    Sheet
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{sheet.modified}</span>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  const renderYearFolders = () => {
    switch (viewMode) {
      case "grid":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {yearFolders.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-4 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer text-center"
                onClick={() => handleFolderClick(item)}
              >
                <Folder className="text-blue-500 mb-2" size={48} />
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate w-full">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.modified}
                </span>
              </div>
            ))}
          </div>
        );

      case "list-info":
        return (
          <div className="space-y-3">
            {yearFolders.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                onClick={() => handleFolderClick(item)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Folder className="text-blue-500 mt-1" size={24} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{item.modified}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          <span>{item.owner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default: // list view
        return (
          <div className="space-y-2">
            {yearFolders.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                onClick={() => handleFolderClick(item)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Folder className="text-blue-500" size={20} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{item.modified}</span>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  // If we're inside a folder, show the back button and monthly sheets
  if (currentFolder) {
    return (
      <div>
        {/* Back button and folder info */}
        <div className="flex items-center gap-4 mb-6 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentFolder.name} - Monthly Sheets
            </h2>
            
          </div>
        </div>

        {/* Monthly sheets */}
        {renderMonthSheets()}
      </div>
    );
  }

  // Show year folders
  return renderYearFolders();
} 