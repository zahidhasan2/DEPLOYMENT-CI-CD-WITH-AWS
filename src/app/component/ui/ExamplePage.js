"use client";
import { useState } from "react";
import UserPanel from "./userPanel";
import ViewContent from "./ViewContent";

export default function ExamplePage() {
  const [currentView, setCurrentView] = useState("list");
  const [currentFolder, setCurrentFolder] = useState(null);

  const handleViewChange = (viewType) => {
    setCurrentView(viewType);
    console.log("View changed to:", viewType);
  };

  const handleFolderOpen = (folder) => {
    setCurrentFolder(folder);
    console.log("Opened folder:", folder.name);
  };

  const handleBackToParent = () => {
    setCurrentFolder(null);
    console.log("Back to parent");
  };

  const handleAddNewSheet = () => {
    if (currentFolder) {
      // You can implement logic to add a new sheet here
      // For now, we'll just show an alert
      alert(`Adding new sheet to ${currentFolder.name}`);
      console.log("Adding new sheet to:", currentFolder.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900">
      <div className=" mx-auto p-4">
        
        {/* User Panel with View Toggle */}
        <UserPanel 
          onViewChange={handleViewChange}
          isInsideFolder={!!currentFolder}
          onAddNewSheet={handleAddNewSheet}
        >
          
        </UserPanel>

        {/* Content Area */}
        <div className="mt-6 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
          <ViewContent 
            viewMode={currentView}
            onFolderOpen={handleFolderOpen}
            onBackToParent={handleBackToParent}
            currentPath={currentFolder ? [currentFolder] : []}
            onAddNewSheet={handleAddNewSheet}
          />
        </div>
        
      </div>
    </div>
  );
} 