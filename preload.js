const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('myAPI', {
  saveFile: (data) => ipcRenderer.invoke("save-file", data),
  openFile: () => ipcRenderer.invoke("open-file"),
  readFile: (filePath)=> ipcRenderer.invoke("read-file", filePath),
  confirmDialog: (message)=> ipcRenderer.invoke("show-confirm-dialog", message),
  pythonDialog: (title)=> ipcRenderer.invoke("open-python-dialog", title),
  
});