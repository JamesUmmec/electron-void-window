import { app, BrowserWindow, ipcMain } from "electron"
import { Status } from "./config"

let status = new Status()

let window: BrowserWindow
function createWindow() {
	window = new BrowserWindow({
		width: status.width, height: status.height,
		minWidth: 500, minHeight: 350,
		x: status.x, y: status.y,
		frame: false,
		webPreferences: { nodeIntegration: true }
	})
	window.loadFile("main.html")
}

ipcMain.on("win", (event, command) => {
	switch (command) {
		case "min": window.minimize(); break
		case "close":
			let size = window.getSize()
			let pos = window.getPosition()

			status.width = size[0]
			status.height = size[1]
			status.x = pos[0]
			status.y = pos[1]

			status.save()

			window.close()
		break

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
