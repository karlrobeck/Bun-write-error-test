import { fileURLToPath, pathToFileURL } from "bun"

export async function validatePath(path: URL): Promise<URL | string> {

  const filePath = fileURLToPath(path)

  if (await Bun.file(filePath).exists()) {
    return pathToFileURL(filePath)
  } else {
    return ""
  }
}