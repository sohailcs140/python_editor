// import React, { useState, useEffect } from "react";
// import { saveAs } from "file-saver";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import CodeMirror from "@uiw/react-codemirror";
// import { python } from "@codemirror/lang-python";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { DeleteFileMessage, ThemeMaped, BackendPaths } from "../utils/constant";
// import Terminal from "./Terminal";

// const MainWindow = () => {
//   const [files, setFiles] = useState([]);
//   const [currentFile, setCurrentFile] = useState(null);
//   const [savedFileName, setSavedFileName] = useState("");
//   const [savedFileContent, setSavedFileContent] = useState("");
//   const [theme, setTheme] = useState(ThemeMaped.oneDark);
//   const [isEdit, setIsEdit] = useState(false);
//   const [preferences, setPreferences] = useState({
//     pythonPath1: "",
//     pythonPath2: "",
//     fontSize: 14,
//   });
//   const [isTerminalOpen, setIsTerminalOpen] = useState(false);
//   const [terminalOutput, setTerminalOutput] = useState({
//     success: true,
//     output:"",
//     error: ""
//   });

//   // load configuration
//   useEffect(() => {
//     const setConfiguration = async () => {
//       try {
//         const resp = await fetch(BackendPaths.configuration);
//         const data = await resp.json();

//         setPreferences({
//           ...preferences,
//           pythonPath1: data?.path_first,
//           pythonPath2: data?.path_second,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     setConfiguration();
//   }, []);

//   const toggleTerminal = () => {
//     setIsTerminalOpen((prev) => !prev);
//   };

//   const handleFileInput = (response) => {
//     const newFile = {
//       name: response.fileName,
//       content: response.content,
//       filePath: response.filePath,
//     };
//     setFiles((prevFiles) => {
//       const filterFiles = prevFiles.filter(
//         (file) => file.filePath != newFile.filePath
//       );
//       return [newFile, ...filterFiles];
//     });
//     setCurrentFile(newFile);
//     setSavedFileName(response.fileName);
//     setSavedFileContent(response.content);
//   };

//   const handleFileSelect = async (file) => {
//     setSavedFileName(file.name);
//     const response = await window.myAPI?.readFile(file.filePath);

//     if (response.success) {
//       setSavedFileContent(response.content);
//       setCurrentFile({ ...file, content: response.content });
//     } else {
//       alert("error while loading the file");
//     }
//   };

//   const handleNewFile = () => {
//     setCurrentFile(null);
//     setSavedFileName("Untitled File");
//     setSavedFileContent("");
//   };

//   const handleSave = async () => {
//     setSavedFileContent(currentFile?.content);
//     const response = await window.myAPI?.saveFile({
//       file: currentFile?.filePath,
//       content: currentFile?.content,
//     });

//     if (response.success) {
//       setIsEdit(false);
//       if (!currentFile?.filePath) {
//         handleFileInput(response);
//       }
//     } else {
//       alert("Failed to save file: " + response.error);
//     }
//   };

//   // const handleDownload = () => {
//   //   if (savedFileName) {
//   //     const blob = new Blob([savedFileContent], {
//   //       type: "text/plain;charset=utf-8",
//   //     });
//   //     saveAs(blob, savedFileName);
//   //     alert(`File "${savedFileName}" downloaded successfully!`);
//   //   } else {
//   //     alert("No file to download.");
//   //   }
//   // };

//   const handleClose = () => {
//     setCurrentFile(null);
//     setSavedFileName("");
//     setSavedFileContent("");
//   };

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//   };

//   const handlePreferencesChange = (prep) => {
//     setPreferences(prep);
//   };

//   const handleCloseFile = async (file) => {
//     const confirm = await window.myAPI?.confirmDialog(DeleteFileMessage);
//     if (confirm) {
//       setFiles((prevFiles) =>
//         prevFiles.filter((currFile) => file.filePath != currFile.filePath)
//       );

//       setCurrentFile(null);
//       setSavedFileName("");
//       setSavedFileContent("");
//     }
//   };

//   return (
//     <div className="flex h-screen flex-col">
//       <div className="flex flex-1 pt-[2.3rem]">
//         <div className="fixed top-[0] left-0 bottom-0 w-[16rem] bg-gray-300 z-[9999] ">
//           <Sidebar
//             files={files}
//             onFileSelect={handleFileSelect}
//             onFileInput={handleFileInput}
//             onNewFile={handleNewFile}
//             onOpenFile={handleFileInput}
//             onSave={handleSave}
//             onPreferencesChange={handlePreferencesChange}
//             currentFileName={currentFile?.name}
//             onCloseFile={handleCloseFile}
//             preferences={preferences}
//             setPreferences={setPreferences}
//           />
//         </div>
//         <div className="ml-[16rem] flex-1 bg-gray-100 relative flex flex-col">
//           <div className="fixed top-[0] left-[16rem] right-0 z-10 bg-white shadow">
//             <Header
//               fileName={savedFileName || "Untitled File"}
//               filePath={currentFile?.filePath}
//               preferences={preferences}
//               onSave={handleSave}
//               onClose={handleClose}
//               onSetTerminalOutPut={setTerminalOutput}
//               isEdit={isEdit}
//               onOpenTerminal={setIsTerminalOpen}
//             />
//           </div>
//           <div className="mt-4 h-full overflow-auto flex flex-col">
//             <div className="flex-1">
//               {currentFile ? (
//                 <CodeMirror
//                   value={currentFile.content}
//                   height="100%"
//                   extensions={[python()]}
//                   theme={theme}
//                   onChange={(value) => {
//                     setCurrentFile((prevFile) => ({
//                       ...prevFile,
//                       content: value,
//                     }));
//                     setIsEdit(true);
//                   }}
//                   className="h-full"
//                   style={{
//                     fontSize: `${preferences.fontSize}px`,
//                   }}
//                 />
//               ) : (
//                 <CodeMirror
//                   value={savedFileContent}
//                   height="100%"
//                   extensions={[python()]}
//                   theme={theme}
//                   onChange={(value) => {
//                     setIsEdit(true);
//                     setCurrentFile({ content: value });
//                   }}
//                   className="h-full"
//                   style={{
//                     fontSize: `${preferences.fontSize}px`,
//                   }}
//                 />
//               )}
//             </div>
//             {/* Terminal Section */}
//             <Terminal isTerminalOpen={isTerminalOpen} terminalOutput={terminalOutput}/>
//           </div>
//           {/* Toggle Terminal Button */}
//           <button
//             className="fixed bottom-2 right-4 bg-blue-900 text-white px-4 py-2 rounded shadow"
//             onClick={toggleTerminal}
//           >
//             {isTerminalOpen ? (
//               <KeyboardArrowDownIcon />
//             ) : (
//               <KeyboardArrowUpIcon />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainWindow;



import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DeleteFileMessage, ThemeMaped, BackendPaths } from "../utils/constant";
import Terminal from "./Terminal";
import Navbar from './Navbar';

const MainWindow = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [savedFileName, setSavedFileName] = useState("");
  const [savedFileContent, setSavedFileContent] = useState("");
  const [theme, setTheme] = useState(ThemeMaped.oneDark);
  const [isEdit, setIsEdit] = useState(false);
  const [preferences, setPreferences] = useState({
    pythonPath1: "",
    pythonPath2: "",
    fontSize: 14,
  });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState({
    success: true,
    output: "",
    error: "",
  });

  // Add state for sidebar collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // load configuration
  useEffect(() => {
    const setConfiguration = async () => {
      try {
        const resp = await fetch(BackendPaths.configuration);
        const data = await resp.json();

        setPreferences({
          ...preferences,
          pythonPath1: data?.path_first,
          pythonPath2: data?.path_second,
        });
      } catch (error) {
        console.log(error);
      }
    };

    setConfiguration();
  }, []);

  const toggleTerminal = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const handleFileInput = (response) => {
    const newFile = {
      name: response.fileName,
      content: response.content,
      filePath: response.filePath,
    };
    setFiles((prevFiles) => {
      const filterFiles = prevFiles.filter(
        (file) => file.filePath != newFile.filePath
      );
      return [newFile, ...filterFiles];
    });
    setCurrentFile(newFile);
    setSavedFileName(response.fileName);
    setSavedFileContent(response.content);
  };

  const handleFileSelect = async (file) => {
    setSavedFileName(file.name);
    const response = await window.myAPI?.readFile(file.filePath);

    if (response.success) {
      setSavedFileContent(response.content);
      setCurrentFile({ ...file, content: response.content });
    } else {
      alert("error while loading the file");
    }
  };

  const handleNewFile = () => {
    setCurrentFile(null);
    setSavedFileName("Untitled File");
    setSavedFileContent("");
  };

  const handleSave = async () => {
    setSavedFileContent(currentFile?.content);
    const response = await window.myAPI?.saveFile({
      file: currentFile?.filePath,
      content: currentFile?.content,
    });

    if (response.success) {
      setIsEdit(false);
      if (!currentFile?.filePath) {
        handleFileInput(response);
      }
    } else {
      alert("Failed to save file: " + response.error);
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

  const handleCloseFile = async (file) => {
    const confirm = await window.myAPI?.confirmDialog(DeleteFileMessage);
    if (confirm) {
      setFiles((prevFiles) =>
        prevFiles.filter((currFile) => file.filePath != currFile.filePath)
      );

      setCurrentFile(null);
      setSavedFileName("");
      setSavedFileContent("");
    }
  };

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col">
      
      <div className="flex flex-1 pt-[2.3rem]">
        <div
          className={`fixed top-0 left-0 bottom-0 transition-all ${
            isSidebarCollapsed ? "w-16" : "w-64"
          } bg-gray-300 z-[9999]`}
        >
          <Sidebar
            files={files}
            onFileSelect={handleFileSelect}
            onFileInput={handleFileInput}
            onNewFile={handleNewFile}
            onOpenFile={handleFileInput}
            onSave={handleSave}
            onPreferencesChange={handlePreferencesChange}
            currentFileName={currentFile?.name}
            onCloseFile={handleCloseFile}
            preferences={preferences}
            setPreferences={setPreferences}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </div>
        <div className={`${isSidebarCollapsed?"ml-[4rem]":"ml-[16rem]"} flex-1 bg-gray-100 relative flex flex-col`}>
          <div className={`fixed top-0 ${isSidebarCollapsed?"left-[4rem] ":"left-[16rem]"} right-0 z-10 bg-white shadow`}>
            <Header
              fileName={savedFileName || "Untitled File"}
              filePath={currentFile?.filePath}
              preferences={preferences}
              onSave={handleSave}
              onClose={handleClose}
              onSetTerminalOutPut={setTerminalOutput}
              isEdit={isEdit}
              onOpenTerminal={setIsTerminalOpen}
            />
          </div>
          <div className="mt-4 h-full overflow-auto flex flex-col">
            <div className="flex-1">
              {currentFile ? (
                <CodeMirror
                  value={currentFile.content}
                  height="100%"
                  extensions={[python()]}
                  theme={theme}
                  onChange={(value) => {
                    setCurrentFile((prevFile) => ({
                      ...prevFile,
                      content: value,
                    }));
                    setIsEdit(true);
                  }}
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
                  onChange={(value) => {
                    setIsEdit(true);
                    setCurrentFile({ content: value });
                  }}
                  className="h-full"
                  style={{
                    fontSize: `${preferences.fontSize}px`,
                  }}
                />
              )}
            </div>
            {/* Terminal Section */}
            <Terminal isTerminalOpen={isTerminalOpen} terminalOutput={terminalOutput}/>
          </div>
          {/* Toggle Terminal Button */}
          <button
            className="fixed bottom-2 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={toggleTerminal}
          >
            {isTerminalOpen ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )}
          </button>
        </div>
      </div>
     
      <button
  onClick={toggleSidebar}
  className={`fixed top-6 ${isSidebarCollapsed?"left-[4rem]":"left-[15rem] "} bg-gray-600  text-white  rounded-md shadow-md z-[999999]`}
>
  {isSidebarCollapsed ? ">" : "<"}
</button>
    </div>
  );
};

export default MainWindow;
