const {ipcRenderer} = require('electron')

window.addEventListener('online', () => {
  console.log('online')
  ipcRenderer.send('online')
})
window.addEventListener('offline', () => {
  console.log('offline')
  ipcRenderer.send('offline')
})
