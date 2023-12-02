import { app, ipcMain, IpcMainEvent } from 'electron'
import { NetStatus } from '../index'

type Callback = (event: IpcMainEvent, ...args: any[]) => void

export default async function addNetListener (onLine: Callback, onOffline: Callback) {
  await app.whenReady()
  ipcMain.on(NetStatus.Online, onLine)
  ipcMain.on(NetStatus.Offline, onOffline)
  return [
    () => ipcMain.off(NetStatus.Online, onLine),
    () => ipcMain.off(NetStatus.Offline, onOffline)
  ]
}