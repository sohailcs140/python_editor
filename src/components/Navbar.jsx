import React, { useState } from "react";

const Navbar = ({
  onNewFile,
  onOpenFile,
  onSave,
  onSaveAs,
  onPreferencesChange,
  
}) => {
  const [activeTab, setActiveTab] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    pythonPath1: "",
    pythonPath2: "",
    fontSize: 14,
  });


  const toggleDropdown = (tab) => {
    if (activeTab === tab) {
      setDropdownOpen(!dropdownOpen);
    } else {
      setActiveTab(tab);
      setDropdownOpen(true);
    }
  };

  const handleOpenFile = async() => {
    try {
      const response = await window.myAPI?.openFile();
      if (response.success) {
        console.log("File opened successfully:", response);
        alert(`File Name: ${response.fileName}\nPath: ${response.filePath}`);
       
        onOpenFile(response)
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error("Error opening file:", error);
      alert("An unexpected error occurred.");
    }
  };


  const handlePreferencesChange = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferencesSave = () => {
    onPreferencesChange(preferences); // Pass preferences to the parent component
    setPreferencesOpen(false);
  };
  const handleThemeChange = (newTheme)=>{
    onThemeChange(newTheme)
  }
  return (
    <div className="bg-gray-800 text-white  z-50">
      <div className="flex ">
        {/* File Tab */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("File")}
            className="px-2 py-2 rounded hover:bg-gray-700"
          >
            File
          </button>
          {activeTab === "File" && dropdownOpen && (
            <div className="absolute top-8 left-0 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-600" onClick={onNewFile}>
                  New File
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={handleOpenFile}
                >
                  Open File
                </li>
                <li className="px-4 py-2 hover:bg-gray-600" onClick={onSave}>
                  Save
                </li>
                <li className="px-4 py-2 hover:bg-gray-600" onClick={onSaveAs}>
                  Save As
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Settings Tab */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Settings")}
            className="px-4 py-2 rounded hover:bg-gray-700"
          >
            Settings
          </button>
          {activeTab === "Settings" && dropdownOpen && (
            <div className="absolute top-8 left-0 w-48 bg-gray-700 text-white rounded shadow-lg">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-600"
                  onClick={() => setPreferencesOpen(true)}
                >
                  Preferences
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      
      {/* Preferences Modal */}

      {preferencesOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white w-[30rem] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Preferences</h2>

            {/* Python Paths */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Python Path 1:</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                value={preferences.pythonPath1}
                onChange={(e) =>
                  handlePreferencesChange("pythonPath1", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Python Path 2:</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                value={preferences.pythonPath2}
                onChange={(e) =>
                  handlePreferencesChange("pythonPath2", e.target.value)
                }
              />
            </div>

            {/* Theme Selector
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Theme:</label>
              <select
                className="w-full p-2 border rounded bg-gray-700 text-white"
              
              >
                <option value={ThemeMaped.oneDark}>One Dark</option>
                <option value={ThemeMaped.dracula}>Dracula</option>
                <option value={ThemeMaped.eclipse}>Eclipse</option>
              </select>
            </div> */}

            {/* Font Size Selector */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Font Size:</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                value={preferences.fontSize?preferences.fontSize:""}
                onChange={(e) =>
                  handlePreferencesChange("fontSize", Number(e.target.value))
                }
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
                onClick={() => setPreferencesOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                onClick={handlePreferencesSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
