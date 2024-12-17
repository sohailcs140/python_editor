// Editor.jsx
import React from "react";
import { Editor } from "@monaco-editor/react";

const EditorComponent = ({ file, onContentChange }) => {
  return (
    <div className="flex-1 overflow-hidden p-4">
      {file ? (
        <Editor
          height="100%"
          language="python"
          theme="vs-dark"
          value={file.content}
          onChange={onContentChange}
        />
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          No file selected. Please select a file to start coding.
        </div>
      )}
    </div>
  );
};

export default EditorComponent;
