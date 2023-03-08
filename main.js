const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const child_process = require("child_process")
app.disableHardwareAcceleration();
let mainWindow;
var child;
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 1000,
		webPreferences: {
			nodeIntegration: true,
		},
		icon : 'file://${__dirname}/dist/dhd-frontend-angular/assets/logo.png'
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(
				__dirname,
				`/dist/dhd-frontend-angular/index.html`
			),
			protocol: "file:",
			slashes: true,
		})
	);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	var jarPath = app.getAppPath() + "\\dhd-backend-1.0.jar";
	child = require("child_process").spawn("java", ["-jar", jarPath, ""]);
	// var kill = require("tree-kill");

	mainWindow.on("closed", function () {
		mainWindow = null;

		// kill(child.pid);
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	process.kill(child.pid)
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (mainWindow === null) createWindow();
});
