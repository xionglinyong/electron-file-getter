import { app, IpcMainEvent, net } from 'electron'

type Callback = (event: IpcMainEvent, ...args: any[]) => void

let {online} = net
let timer: NodeJS.Timeout | undefined
const listeners: Record<'online' | 'offline', Set<Function>> = {
  online: new Set(),
  offline: new Set()
}

export default async function addNetListener (onLine: Callback, onOffline: Callback) {
  if (!timer) {
    timer = setInterval(() => {
      const isOnline = net.online
      if (online === isOnline) return
      listeners[isOnline ? 'online' : 'offline'].forEach(fn => fn())
      online = isOnline
    }, 1000)
  }
  await app.whenReady()
  listeners.online.add(onLine)
  listeners.offline.add(onOffline)
  return [
    () => listeners.online.delete(onLine),
    () => listeners.offline.delete(onOffline)
  ]
}