// @ts-ignore
import extName from 'ext-name'
import * as path from 'path'
import { existsSync } from 'fs'

export function getFilenameFromMime (name: string, mime: string) {
  const extensions = extName.mime(mime)

  if (extensions.length !== 1) {
    return name
  }

  return `${name}.${extensions[0].ext}`
}

export function unusedFilename (filepath: string): string {
  const dirname = path.dirname(filepath)
  const basename = path.basename(filepath, path.extname(filepath))
  const extname = path.extname(filepath)

  let count = 1
  let newFilePath = filepath

  // 生成新的文件路径，直到找到一个不存在的路径
  while (existsSync(newFilePath)) {
    newFilePath = path.join(dirname, `${basename} (${count})${extname}`)
    count++
  }
  return newFilePath
}