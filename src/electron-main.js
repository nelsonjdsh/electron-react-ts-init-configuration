const { app, BrowserWindow } = require("electron");

const path = require('path');

let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false
    }
  });

  // TODO: Fix the problem that produces blank screen using a local server instead of the production building.
  //mainWindow.loadFile(process.env.ELECTRON_START_URL || path.join(__dirname, '/../build/index.html'))
  mainWindow.loadFile(path.join(__dirname, '/../build/index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow();
});


