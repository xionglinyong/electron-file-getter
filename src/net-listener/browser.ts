import { app, BrowserWindow } from 'electron'
import { NetStatus } from '../index'

let browserWindow: BrowserWindow | null = null

export async function startNetListener () {
  await app.whenReady()

  if (browserWindow) {
    browserWindow.destroy()
    browserWindow = null
  }

  browserWindow = new BrowserWindow({show: false})
  const code = `
  import {ipcRenderer} from 'electron'
  window.addEventListener('online', () => ipcRenderer.send(${NetStatus.Online}))
  window.addEventListener('offline', () => ipcRenderer.send(${NetStatus.Offline}))
  `
  browserWindow.webContents.executeJavaScript(code)
}

export function cancelNetListener () {
  browserWindow && browserWindow.destroy()
  browserWindow = null
}