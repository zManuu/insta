import { access, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

async function existsPath(path: string) {
  try {
    await access(path)
    return true
  } catch (error) {
    return false
  }
}

async function getContent(path: string, encoding: BufferEncoding = 'utf8') {
  return readFile(path, { encoding })
}

async function uploadImage(id: number, content: string): Promise<boolean> {
  const cwd = process.cwd()
  const imgUrl = join(cwd, 'uploads', id.toString())

  if (existsPath(imgUrl))
    return false

  try {
    await writeFile(imgUrl, content, { encoding: 'base64' })
  } catch {
    return false
  }

  return true
}

export {
  existsPath,
  getContent,
  uploadImage
}