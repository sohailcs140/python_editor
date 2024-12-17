// Header.jsx
import React from 'react';

const Header = ({ fileName, onSave, onDownload, onClose }) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="font-semibold text-lg">{fileName}</div>
      <div className="space-x-4">
        <button onClick={onSave} className="bg-green-500 px-4 py-2 rounded">
          Save
        </button>
        <button onClick={onDownload} className="bg-blue-500 px-4 py-2 rounded">
          Download
        </button>
        <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Header;
