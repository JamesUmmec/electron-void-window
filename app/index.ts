import { app, BrowserWindow } from "electron"

let window: BrowserWindow
function createWindow() {
	window = new BrowserWindow({
		width: 500, height: 300,
		webPreferences: { nodeIntegration: true }
	})
	window.loadFile("main.html")
}

app.whenReady().then(createWindow)
