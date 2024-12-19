import React from "react";
import Navbar from "./Navbar";
import pythonLogo from "../assets/python.png";
import { python } from "@codemirror/lang-python";
import { useState } from "react";

const Sidebar = ({
  files,
  onFileSelect,
  onNewFile,
  onOpenFile,
  onSave,
  onSaveAs,
  onPreferencesChange,
  currentFileName,
}) => {
  const [activeFileName, setActiveFileName] = useState(currentFileName);

  console.log(files)

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-full">
      <Navbar
        onNewFile={onNewFile}
        onOpenFile={onOpenFile}
        onSave={onSave}
        onSaveAs={onSaveAs}
        onPreferencesChange={onPreferencesChange}
      />

      <h2 className="text-lg font-semibold mb-4">Files</h2>
      {/* File list */}
      <ul>
        {files.length > 0 ? (
          files.map((file, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-600 cursor-pointer items-center flex gap-2 fileTabe ${
                activeFileName == file.name && "active"
              }`}
              onClick={() => {
                onFileSelect(file);
                setActiveFileName(file.name);
              }}
            >
              <img
                src={pythonLogo}
                alt="python-logo"
                srcset=""
                className="w-[18px] h-[18px]"
              />{" "}
              {file.name}
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-500">No files available</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
