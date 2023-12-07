import { ipcRenderer } from 'electron'

type window = any

window.addEventListener('online', () => {
  console.log('online')
  ipcRenderer.send('online')
})
window.addEventListener('offline', () => {
  console.log('offline')
  ipcRenderer.send('offline')
})