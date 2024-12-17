import React from 'react';

const Sidebar = ({ files, onFileSelect }) => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Files</h2>
      
      {/* File list */}
      <ul>
        {files.length > 0 ? (
          files.map((file, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => onFileSelect(file)}
            >
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
