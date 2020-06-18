# Electron + ReactJS + TS Initial Configuration

It's the initial configuration to then run an Electron app using ReactJS and TS

## Getting Started


### Installation

After cloning the repository, run the following command inside the project directory:

```
npm install
```

### Run

To run the electron app for developer mode, you need to run the following two commands in your terminal into the project directory.

```
npm start
npm run start-electron
```

## Replicate the project

I followed the steps below to make up with this project:

- Create a new ReactJS app:
  ```bash
  create-react-app <project name>
  cd <project name>
  ```

- Install Electron in the project:

  ```bash
  npm install --save-dev electron
  ```
- Create a file into `src` directory called `electron-main.js` and paste the following code:

  ```js
  const { app, BrowserWindow } = require("electron");

  const path = require('path');
  const url = require('url')

  let mainWindow;
  function createWindow() {
    const startUrl =  'http://localhost:3000' || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

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
  ```

- Config `packaje.json` adding or modifying the following:

  ```json
  "homepage": "./",
  "main": "src/electron-main.js",
  "scripts": {
    // ...
    "start": "export BROWSER=none && react-scripts start",
    "start-electron": "export ELECTRON_START_URL=http://localhost:3000 && electron .",
    "react-start": "react-scripts start"
    //..
  },
  ```

## References

- [Building a production electron/create-react-app application with shared code using electron-builder](https://medium.com/@johndyer24/building-a-production-electron-create-react-app-application-with-shared-code-using-electron-builder-c1f70f0e2649)
