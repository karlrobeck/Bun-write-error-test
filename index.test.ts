import { test, expect } from "bun:test"
import { validatePath } from "."
import { pathToFileURL } from "bun"

test("validate executable given in the config using `validatePath`: invalid value", async () => {

  const filePath = "./sample.exe"

  const newFilePath = await validatePath(pathToFileURL(filePath))

  expect(newFilePath).toBe("");
})

test("validate executable given in the config using `validatePath`: expected real implementation", async () => {

  const editorPath: URL | string = pathToFileURL("./metaeditor64.exe")
  const terminalPath: URL | string = pathToFileURL("./terminal64.exe")

  await Bun.write(editorPath.pathname, "im a editor")
  await Bun.write(terminalPath.pathname, "im a terminal")

  const newEditorPath = <URL>await validatePath(editorPath)
  const newTerminalPath = <URL>await validatePath(terminalPath)

  expect(newEditorPath.pathname).toBe(editorPath.pathname)
  expect(newTerminalPath.pathname).toBe(terminalPath.pathname)
})