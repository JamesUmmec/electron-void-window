import { mkdirSync, statSync } from "fs"

export function ensureDir(name: string) {
	try { if(statSync(name).isDirectory()) { return } } catch {}
	mkdirSync(name)
}

export function readToObject(from: string, to: Object) {
	let json = JSON.parse(from)
	Object.keys(to).forEach((parameter) => {
		try {
			if(eval("json." + parameter)){
				eval("to." + parameter + "= json." + parameter)
			}
		} catch {}
	})
}
