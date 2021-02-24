import { app, BrowserWindow, ipcMain } from "electron"

let window: BrowserWindow
function createWindow() {
	window = new BrowserWindow({
		width: 900, height: 650,
		minWidth: 500, minHeight: 350,
		frame: false,
		webPreferences: { nodeIntegration: true }
	})
	window.loadFile("main.html")
}

ipcMain.on("win", (event, command) => {
	switch (command) {
		case "min": window.minimize(); break
		case "close": window.close(); break

		case "max":
			if (window.isMaximized()) {
				window.restore()
				event.sender.send("win", "res")
			} else {
				window.maximize()
				event.sender.send("win", "max")
			}
		break

		case "full":
			if (window.isFullScreen()) {
				window.setFullScreen(false)
				event.sender.send("win", "win")
			} else {
				window.setFullScreen(true)
				event.sender.send("win", "ful")
			}
		break
	}
})

app.whenReady().then(createWindow)
