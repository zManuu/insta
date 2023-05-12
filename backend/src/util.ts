import { access, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { logger } from './app.js'
import { existsSync } from 'fs'

async function existsPath(path: string) {
  // try {
  //   await access(path)
  //   return true
  // } catch (error) {
  //   return false
  // }
  //! ^ not working?!

  return existsSync(path)
}

async function getContent(path: string, encoding: BufferEncoding = 'utf8') {
  return readFile(path, { encoding })
}

async function uploadImage(id: number, content: string): Promise<boolean> {
  const cwd = process.cwd()
  const imgUrl = join(cwd, 'uploads', id.toString())

  try {
    await writeFile(imgUrl, content)
  } catch {
    logger.log('writeFile in uploadImage failed.')
    return false
  }

  return true
}

export {
  existsPath,
  getContent,
  uploadImage
}