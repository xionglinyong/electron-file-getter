import { ipcRenderer } from 'electron'

window.addEventListener('online', () => {
  ipcRenderer.send('online')
})
window.addEventListener('offline', () => {
  ipcRenderer.send('offline')
})