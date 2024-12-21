import React from "react";
import Navbar from "./Navbar";
import pythonLogo from "../assets/python.png";
import { python } from "@codemirror/lang-python";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from '@mui/icons-material/Description';

const Sidebar = ({
  files,
  onFileSelect,
  onNewFile,
  onOpenFile,
  onSave,
  onPreferencesChange,
  currentFileName,
  onCloseFile,
  preferences,
  setPreferences,
  isSidebarCollapsed,
}) => {
  const [activeFileName, setActiveFileName] = useState(currentFileName);

  useEffect(() => {
    setActiveFileName(currentFileName);
  }, [files]);

  return (
    <div className="bg-gray-800 text-white h-full overflow-hidden">
      <Navbar
        onNewFile={onNewFile}
        onOpenFile={onOpenFile}
        onSave={onSave}
        onPreferencesChange={onPreferencesChange}
        preferences={preferences}
        setPreferences={setPreferences}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className="flex h-full">
        <div className="bg-gray-700 p-2">
          <ul>
            <li className=" cursor-pointer"><DescriptionIcon/></li>
          </ul>
        </div>
        <div>
          {!isSidebarCollapsed && (
            <h5 className="mb-4 uppercase text-[14px] text-gray-400">
              Explorer
            </h5>
          )}
          {/* File list */}
          <ul>
            {files.length > 0
              ? files.map((file, index) => (
                  <li
                    key={index}
                    className={`group px-2 py-1 cursor-pointer fileTabe ${
                      activeFileName == file.name
                        ? "active"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      onFileSelect(file);
                      setActiveFileName(file.name);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <img
                          src={pythonLogo}
                          alt="python-logo"
                          className="w-[16px] h-[16px]"
                        />
                        <span className="text-[16px] text-gray-300 font-[300]">
                          {file.name}
                        </span>
                      </div>
                      <button
                        onClick={() => onCloseFile(file)}
                        className="opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <CloseIcon fontSize="16px" />
                      </button>
                    </div>
                  </li>
                ))
              : !isSidebarCollapsed && (
                  <li className="px-4 py-2 text-gray-500">
                    No files available
                  </li>
                )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
