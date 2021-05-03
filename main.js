// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  //Menus?
  const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'
/*
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['connect-src \'http://ec2-54-157-162-187.compute-1.amazonaws.com/quizlet/login.php\'']
    }
  })
})
*/

app.on('ready', () => {
  // Modify the origin for all requests to the following urls.
  const filter = {
    urls: ['http://example.com/*', "http://ec2-54-157-162-187.compute-1.amazonaws.com/*"]
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      console.log(details);
      details.requestHeaders['Origin'] = 'http://example.com';
      callback({ requestHeaders: details.requestHeaders });
    }
  );

  session.defaultSession.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
      console.log(details);
      details.responseHeaders['Access-Control-Allow-Origin'] = [
        'capacitor-electron://-'
      ];
      callback({ responseHeaders: details.responseHeaders });
    }
  );

  myCapacitorApp.init();
});

const template =
 [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      {
        label: 'Preferences',
        click() { openAboutWindow() }

      },
      //{ role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Create',
    submenu: [
      {
        label: 'Create a Set',
        click() { openCreateWindow() }

      }
    ]
  },
  {
    label: 'Verify Email',
    submenu: [
      {
        label: 'Verify my Email',
        click() { openVerifyWindow() }

      }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More about this Project',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://classes.engineering.wustl.edu/cse330/index.php?title=Module_7')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

var newWindow = null

function openAboutWindow() {
  if (newWindow) {
    newWindow.focus()
    return
  }

  newWindow = new BrowserWindow({
    height: 300,
    resizable: true,
    width: 400,
    title: '',
    minimizable: false,
    fullscreenable: false,

    webSecurity: false

  })
  console.log(__dirname);
  newWindow.loadURL(`file://${__dirname}/preferences.html`);

  newWindow.on('closed', function() {
    newWindow = null
  })
}

function openVerifyWindow() {
  if (newWindow) {
    newWindow.focus()
    return
  }

  newWindow = new BrowserWindow({
    height: 300,
    resizable: true,
    width: 400,
    title: 'Verify your email',
    minimizable: false,
    fullscreenable: false,

    webSecurity: false

  })
  console.log(__dirname);
  newWindow.loadURL(`file://${__dirname}/verify.html`);

  newWindow.on('closed', function() {
    newWindow = null
  })
}

function openCreateWindow() {
  if (newWindow) {
    newWindow.focus()
    return
  }

  newWindow = new BrowserWindow({
    height: 800,
    resizable: true,
    width: 400,
    title: 'Create Set',
    minimizable: false,
    fullscreenable: false,

    webSecurity: false

  })
  console.log(__dirname);
  newWindow.loadURL(`file://${__dirname}/create.html`);

  newWindow.on('closed', function() {
    newWindow = null
  })
}



}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

/*
var ipcMain = require('electron').ipcMain;

console.log(ipcMain);

ipcMain.once('username', function (event,store) {
    console.log(store);
});
*/

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
