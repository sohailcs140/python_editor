// Header.jsx
import React from 'react';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Header = ({ fileName, onSave, onDownload, onClose }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="font-semibold text-lg">{fileName}</div>
      <div className="flex gap-4 items-center">
       
        <button  className="p-2  rounded hover:bg-gray-600">
          <span>Run 1</span><PlayArrowIcon />
        </button>
        <button  className="p-2  rounded  hover:bg-gray-600">
          <span>Run 2</span><PlayArrowIcon />
        </button>
      </div>
      <div className="space-x-4">
        <button onClick={onSave} className="px-2 py-2 rounded hover:bg-gray-600">
          <SaveIcon/>
        </button>
        <button onClick={onDownload} className="px-2 py-2 rounded hover:bg-gray-600">
          <DownloadForOfflineIcon/>
        </button>
        <button onClick={onClose} className="px-2 py-2 rounded hover:bg-gray-600">
          <CancelIcon/>
        </button>
      </div>
    </div>
  );
};

export default Header;
