// FileInput.jsx
import React from "react";

const FileInput = ({ onFileInput }) => {
  return (
    <div className="hidden">
      <input
        type="file"
        accept=".py"
        id="file-input"
        onChange={onFileInput}
      />
    </div>
  );
};

export default FileInput;
