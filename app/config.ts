import { ensureDir, readToObject } from "./file"
import { readFileSync, writeFileSync } from "fs"

const CONFIG_DIR = "config"
const STATUS = "config/status.json"

export class Status {
	width: number = 900
	height: number = 550
	x: number = 312
	y: number = 123

	constructor() {
		ensureDir(CONFIG_DIR)
		try {
			let raw = readFileSync(STATUS, "utf8")
			readToObject(raw, this)
		} catch {}
	}

	save() {
		try {
			writeFileSync(STATUS, JSON.stringify(this))
		} catch {}
	}
}
