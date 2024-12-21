import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";
import fs from "fs";

const isPackaged = app.isPackaged;
const __dirname = path.dirname(new URL(import.meta.url).pathname); // Keep __dirname for development

app.disableHardwareAcceleration();

async function createWindow() {
  try {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: isPackaged
          ? path.join(process.resourcesPath, 'preload.js')  // Path for packaged app
          : path.join(__dirname, 'preload.js'), // Path for development
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    await win.loadFile(path.join(__dirname, "dist", "index.html"));
    await win.webContents.openDevTools();
  } catch (error) {
    console.error("Error creating the window:", error);
  }
}

// SAVE FILE
ipcMain.handle("save-file", async (event, { file, content }) => {
  try {
   
    let filePath = file;
    
    if (!filePath) {
      const result = await dialog.showSaveDialog({
        defaultPath: "Untitled.py", 
        filters: [
          { name: "Python Files", extensions: ["py"] },
        ],
      });

      if (!result.filePath) {
        return { success: false, error: "No file selected for saving." };
      }
      filePath = result.filePath;
    }

    if (!path.extname(filePath)) {
      filePath += ".py";
    }


    fs.writeFileSync(filePath, content || "", "utf-8");
    return { 
      success: true, 
      filePath, 
      fileName: filePath.split("/").pop(),
      content
    };
  } catch (error) {
    console.error("Error saving the file:", error);
    return { success: false, error: error.message };
  }
});



// OPEN NEW FILE
ipcMain.handle("open-file", async () => {
  try {
    
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "Python Files", extensions: ["py"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    if (result.canceled) {
      return { success: false, error: "No file selected" };
    }

    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, "utf-8");

    return {
      success: true,
      fileName: filePath.split("/").pop(),
      filePath,
      content,
    };
  } catch (error) {
    console.error("Error opening file:", error);
    return { success: false, error: error.message };
  }
});


// READ FILE
ipcMain.handle("read-file", async(event, filePath)=>{
  try{
    const content = fs.readFileSync(filePath, "utf-8");
    return {
      success: true,
      content,
    };
  }catch(error){
    return { success: false, error: error.message };
  }
});


// confirm dialog
ipcMain.handle("show-confirm-dialog", async (event, message) => {
  const result = await dialog.showMessageBox({
    type: "question",
    buttons: ["Yes", "No"], 
    defaultId: 1, 
    title: "Confirmation",
    message: message || "Are you sure you want to proceed?",
  });

  return result.response === 0;
});

// python paths dialog
ipcMain.handle('open-python-dialog', async (event,title) => {
  const result = await dialog.showOpenDialog({
    title: title,
    properties: ['openFile'],
  });
  return result.filePaths[0]; 
});




app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
