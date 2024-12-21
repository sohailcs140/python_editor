// Header.jsx
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { BackendPaths } from "../utils/constant";

const Header = ({
  preferences,
  filePath,
  fileName,
  onSave,
  onClose,
  onSetTerminalOutPut,
  isEdit,
  onOpenTerminal,
}) => {
  const handleRunCode = async (pythonPath) => {
    onSetTerminalOutPut({
      success: true,
      error: "",
      output: "",
    });
    try {
      onSave();
      const resp = await fetch(BackendPaths.execute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          python_path: pythonPath,
          script_path: filePath,
        }),
      });

      if (!resp.body) {
        console.error("ReadableStream not supported.");
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      onOpenTerminal(true);
      let errorOccurred = false;
      let errorMessage = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });

          if (chunk.includes("ERROR:")) {
            errorOccurred = true;
            errorMessage += chunk;
          }else{
        onSetTerminalOutPut((prev) => ({
            ...prev,
            output: (prev.output || "") + chunk,
          }));
          }

  
        }
      }
      if (errorOccurred) {
        onSetTerminalOutPut((prev) => ({
          ...prev,
          error: errorMessage,
          success: false,
        }));
      }
    } catch (error) {}
  };

  return (
    <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
      <div className="font-semibold text-lg">{fileName}</div>
      <div className="flex gap-4 items-center">
        <button
          className="p-2  rounded hover:bg-gray-600"
          onClick={() => handleRunCode(preferences.pythonPath1)}
        >
          <span>Run 1</span>
          <PlayArrowIcon />
        </button>
        <button
          className="p-2  rounded  hover:bg-gray-600"
          onClick={() => handleRunCode(preferences.pythonPath2)}
        >
          <span>Run 2</span>
          <PlayArrowIcon />
        </button>
      </div>
      <div className="space-x-4">
        <button
          onClick={onSave}
          className="px-2 py-2 rounded hover:bg-gray-600 relative"
        >
          <SaveIcon />
          {isEdit && (
            <span className="absolute top-[-4] right-0 w-[10px] h-[10px] rounded-full bg-white"></span>
          )}
        </button>

        <button
          onClick={onClose}
          className="px-2 py-2 rounded hover:bg-gray-600"
        >
          <CancelIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
