const { app, BrowserWindow } = require("electron");

const path = require('path');
const url = require('url')

let mainWindow;
function createWindow() {

  // TODO: Fix the problem that produces blank screen using a local server instead of the production building.
  const startUrl =  'http://localhost:3000' || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(startUrl)
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


