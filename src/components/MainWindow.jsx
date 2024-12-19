import React, { useState } from "react";
import { saveAs } from "file-saver";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { ThemeMaped } from "../constants";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const MainWindow = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [savedFileName, setSavedFileName] = useState("");
  const [savedFileContent, setSavedFileContent] = useState("");
  const [theme, setTheme] = useState(ThemeMaped.oneDark);
  const [fileObject, setFileObject] = useState("")

  const [preferences, setPreferences] = useState({
    pythonPath1: "",
    pythonPath2: "",
    fontSize: 14,
  });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("Output will appear here...");

  const toggleTerminal = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const handleFileInput = (response) => {
      
      const newFile = { name: response.fileName, content:response.content, filePath: response.filePath };
      setFiles((prevFiles) => [...prevFiles, newFile]);
      setCurrentFile(newFile);
      setSavedFileName(response.fileName);
      setSavedFileContent(response.content);
      setFileObject(response.filePath)

  };

  const handleFileSelect = (file) => {
    setCurrentFile(file);
    setSavedFileName(file.name);
    setSavedFileContent(file.content);
  };

  const handleNewFile = () => {
    setCurrentFile(null);
    setSavedFileName("Untitled File");
    setSavedFileContent("");
    
  };

  const handleSave = async () => {
    if (savedFileName) {
      alert(savedFileName)
      setSavedFileContent(currentFile.content);
      alert(currentFile.filePath)
      const response = await window.myAPI?.saveFile({
        file: currentFile.filePath,
        content: currentFile.content
      });
      
      if (response.success) {
        alert('File saved successfully');
      } else {
        alert('Failed to save file: ' + response.error);
      }

    } else {
      const name = await window.myAPI.showPrompt();
      if (name) {
        setSavedFileName(name);
        setSavedFileContent(currentFile.content);
        alert(`New file "${name}" created and saved successfully!`);
      }
    }
  };

  const handleSaveAs = () => {
    const name = prompt("Enter a new file name (e.g., example.py):", savedFileName);
    if (name) {
      setSavedFileName(name);
      setSavedFileContent(currentFile.content);
      alert(`File saved as "${name}"`);
    }
  };

  const handleDownload = () => {
    if (savedFileName) {
      const blob = new Blob([savedFileContent], { type: "text/plain;charset=utf-8" });
      saveAs(blob, savedFileName);
      alert(`File "${savedFileName}" downloaded successfully!`);
    } else {
      alert("No file to download.");
    }
  };

  const handleClose = () => {
    setCurrentFile(null);
    setSavedFileName("");
    setSavedFileContent("");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handlePreferencesChange = (prep) => {
    setPreferences(prep);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 pt-[2.3rem]">
        <div className="fixed top-[0] left-0 bottom-0 w-[16rem] bg-gray-300 z-[9999]">
          <Sidebar
            files={files}
            onFileSelect={handleFileSelect}
            onFileInput={handleFileInput}
            onNewFile={handleNewFile}
            onOpenFile={handleFileInput}
            onSave={handleSave}
            onSaveAs={handleSaveAs}
            onPreferencesChange={handlePreferencesChange}
            currentFileName={currentFile?.name}
          />
        </div>
        <div className="ml-[16rem] flex-1 bg-gray-100 relative flex flex-col">
          <div className="fixed top-[0] left-[16rem] right-0 z-10 bg-white shadow">
            <Header
              fileName={savedFileName || "Untitled File"}
              onSave={handleSave}
              onDownload={handleDownload}
              onClose={handleClose}
            />
          </div>
          <div className="mt-8 h-full overflow-auto flex flex-col">
            <div className="flex-1">
              {currentFile ? (
                <CodeMirror
                  value={currentFile.content}
                  height="100%"
                  extensions={[python()]}
                  theme={theme}
                  onChange={(value) =>
                    setCurrentFile((prevFile) => ({ ...prevFile, content: value }))
                  }
                  className="h-full"
                  style={{
                    fontSize: `${preferences.fontSize}px`,
                  }}
                />
              ) : (
                <CodeMirror
                  value={savedFileContent}
                  height="100%"
                  extensions={[python()]}
                  theme={theme}
                  onChange={(value) => setCurrentFile({ content: value })}
                  className="h-full"
                  style={{
                    fontSize: `${preferences.fontSize}px`,
                  }}
                />
              )}
            </div>
            {/* Terminal Section */}
            <div
              className={`transition-all duration-300 ${
                isTerminalOpen ? "h-[40%]" : "h-0"
              } w-full bg-black text-white overflow-hidden fixed left-[16rem] bottom-0 right-0
               border-t-[1px] border-gray-400
              `}
            >
              <div className="p-2 text-sm">
                <pre>{terminalOutput}</pre>
              </div>
            </div>
          </div>
          {/* Toggle Terminal Button */}
          <button
            className="fixed bottom-2 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={toggleTerminal}
            
          >
            {isTerminalOpen ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
