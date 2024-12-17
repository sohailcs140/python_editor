import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Sidebar from './Sidebar'; // Sidebar component
import Header from './Header'; // Header component
import Editor from '@monaco-editor/react'; // Monaco editor
import Navbar from './Navbar'; // Navbar component

const MainWindow = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [savedFileName, setSavedFileName] = useState('');
  const [savedFileContent, setSavedFileContent] = useState('');

  // Handle file input (file selection from the system)
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/x-python') {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const newFile = { name: file.name, content };
        setFiles((prevFiles) => [...prevFiles, newFile]); // Add file to the list
        setCurrentFile(newFile); // Set the current file to the newly opened one
        setSavedFileName(file.name);
        setSavedFileContent(content); // Set the content of the opened file
      };
      reader.readAsText(file);
    } else {
      alert('Please select a Python file.');
    }
  };

  // Handle file selection from the sidebar
  const handleFileSelect = (file) => {
    setCurrentFile(file);
    setSavedFileName(file.name);
    setSavedFileContent(file.content);
  };

  // Handle creating a new file
  const handleNewFile = () => {
    setCurrentFile(null);
    setSavedFileName('Untitled File');
    setSavedFileContent('');
  };

  // Handle saving the file (either updating existing or creating new)
  const handleSave = () => {
    if (savedFileName) {
      setSavedFileContent(currentFile.content);
      alert(`File "${savedFileName}" saved successfully!`);
    } else {
      const name = prompt('Enter a new file name (e.g., example.py):', 'new_file.py');
      if (name) {
        setSavedFileName(name);
        setSavedFileContent(currentFile.content);
        alert(`New file "${name}" created and saved successfully!`);
      }
    }
  };

  // Handle Save As (allows renaming the file)
  const handleSaveAs = () => {
    const name = prompt('Enter a new file name (e.g., example.py):', savedFileName);
    if (name) {
      setSavedFileName(name);
      setSavedFileContent(currentFile.content);
      alert(`File saved as "${name}"`);
    }
  };

  // Handle downloading the file
  const handleDownload = () => {
    if (savedFileName) {
      const blob = new Blob([savedFileContent], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, savedFileName);
      alert(`File "${savedFileName}" downloaded successfully!`);
    } else {
      alert('No file to download.');
    }
  };

  // Handle closing the current file
  const handleClose = () => {
    setCurrentFile(null);
    setSavedFileName('');
    setSavedFileContent('');
  };

  return (
    <div className="flex h-screen bg-gray-200 flex-col">
      {/* Navbar at the very top */}
      <Navbar 
        onNewFile={handleNewFile} 
        onOpenFile={handleFileInput} 
        onSave={handleSave} 
        onSaveAs={handleSaveAs} 
      />

      {/* Main content layout */}
      <div className="flex flex-1">
        {/* Sidebar with file list and file input */}
        <Sidebar
          files={files}
          onFileSelect={handleFileSelect}
          onFileInput={handleFileInput} // Ensure this is also passed to Sidebar for file input
        />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 relative flex flex-col">
          {/* Header displaying file name and actions */}
          <Header
            fileName={savedFileName || 'Untitled File'}
            onSave={handleSave}
            onDownload={handleDownload}
            onClose={handleClose}
          />

          {/* Editor for displaying file content */}
          <div className="flex-1 overflow-hidden">
            {currentFile ? (
              <Editor
                height="100%"
                theme="vs-dark"
                language="python"
                value={savedFileContent}  // Use savedFileContent to control the editor
                onChange={(value) => setCurrentFile((prevFile) => ({ ...prevFile, content: value }))}
              />
            ) : (
              <Editor
                height="100%"
                theme="vs-dark"
                language="python"
                value={savedFileContent}  // Show empty content if no file selected
                onChange={(value) => setCurrentFile({ content: value })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
