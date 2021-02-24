import { ipcRenderer } from "electron"
import * as $ from "jquery"

/** init window control */
export function initWin() {
	$("#min").click(() => { win("min") })
	$("#max").click(() => { win("max") })
	$("#full").click(() => { win("full") })
	$("#close").click(() => { win("close") })
	
	$("#corner").click(() => { win("full") })

	ipcRenderer.on("win", (event, message) => {
		switch (message) {
			case "max": $("#max > img").attr({src: "static/res.svg"}); break
			case "res": $("#max > img").attr({src: "static/max.svg"}); break

			case "ful":
				$("header").css({display: "none"})
				$("#corner").css({display: "block"})
			break

			case "win":
				$("header").css({display: "block"})
				$("#corner").css({display: "none"})
			break
		}
	})
}

function win(command: string) {
	ipcRenderer.send("win", command)
}
