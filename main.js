const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const url = require("url");

const { autoUpdater, AppUpdater } = require("electron-updater");
const { log } = require("console");


// flags
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

let win;
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
	webSecurity: false
   } });
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // The following is optional and will open the DevTools:
   win.webContents.openDevTools()
   console.log('open');
  win.on("closed", () => {
    win = null;
  });
}




app.whenReady().then(() => {
	createWindow();

	app.on("activate" , function() {
		if (BrowserWindow.getAllWindows().length == 0) createWindow();
	})

	autoUpdater.checkForUpdates();
})

autoUpdater.on("update-available", (info) => {
	const options = {
		type: 'question',
		buttons: ['Yes, please', 'No, thanks'],
		defaultId: 0,
		title: 'Question',
		message: 'Do you want to do this?',
	  };

	  dialog.showMessageBox(win, options).then( (response, checkboxChecked) => {
		if (response == 0) autoUpdater.downloadUpdate();

	  })

})


autoUpdater.on("update-downloaded", (response) => {
	autoUpdater.quitAndInstall()
})




// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
