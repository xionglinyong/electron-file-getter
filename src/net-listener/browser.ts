import { app, BrowserWindow } from 'electron'
import { join } from 'path'

let browserWindow: BrowserWindow | null = null

export async function startNetListener () {
  await app.whenReady()

  if (browserWindow) {
    browserWindow.destroy()
    browserWindow = null
  }

  browserWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload/index.cjs'),
      sandbox: false,
      webSecurity: false,
      devTools: false
    }
  })
  browserWindow.loadFile(join(__dirname, 'preload/index.html'))
}

export function cancelNetListener () {
  browserWindow && browserWindow.destroy()
  browserWindow = null
}