import React, { useState } from 'react';

const Navbar = ({ onNewFile, onOpenFile, onSave, onSaveAs }) => {
  const [activeTab, setActiveTab] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = React.useRef(null);

  const toggleDropdown = (tab) => {
    if (activeTab === tab) {
      setDropdownOpen(!dropdownOpen);
    } else {
      setActiveTab(tab);
      setDropdownOpen(true);
    }
  };

  const handleOpenFile = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    onOpenFile(e);
  };

  return (
    <div className="bg-gray-800 text-white p-2 z-[90000]">
      <div className="flex space-x-4">
        {/* File Tab */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('File')}
            className="px-4 py-2 rounded hover:bg-gray-700"
          >
            File
          </button>
          {activeTab === 'File' && dropdownOpen && (
            <div className="absolute top-8 left-0 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={onNewFile}
                >
                  New File
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={handleOpenFile}
                >
                  Open File
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={onSave}
                >
                  Save
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={onSaveAs}
                >
                  Save As
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* View Tab */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('View')}
            className="px-4 py-2 rounded hover:bg-gray-700"
          >
            View
          </button>
          {activeTab === 'View' && dropdownOpen && (
            <div className="absolute top-8 left-0 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-600">Zoom In</li>
                <li className="px-4 py-2 hover:bg-gray-600">Zoom Out</li>
                <li className="px-4 py-2 hover:bg-gray-600">Toggle Sidebar</li>
              </ul>
            </div>
          )}
        </div>

        {/* Edit Tab */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('Edit')}
            className="px-4 py-2 rounded hover:bg-gray-700"
          >
            Edit
          </button>
          {activeTab === 'Edit' && dropdownOpen && (
            <div className="absolute top-8 left-0 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-600">Cut</li>
                <li className="px-4 py-2 hover:bg-gray-600">Copy</li>
                <li className="px-4 py-2 hover:bg-gray-600">Paste</li>
                <li className="px-4 py-2 hover:bg-gray-600">Undo</li>
                <li className="px-4 py-2 hover:bg-gray-600">Redo</li>
              </ul>
            </div>
          )}
        </div>

        {/* Settings Tab */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('Settings')}
            className="px-4 py-2 rounded hover:bg-gray-700"
          >
            Settings
          </button>
          {activeTab === 'Settings' && dropdownOpen && (
            <div className="absolute top-8 left-0 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-600">Preferences</li>
                <li className="px-4 py-2 hover:bg-gray-600">Extensions</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input for opening file */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".py"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default Navbar;
