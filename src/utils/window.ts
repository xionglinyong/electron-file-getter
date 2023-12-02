import { BrowserWindow, WebContents } from 'electron'

function getWindowFromBrowserView (webContents: WebContents) {
  for (const currentWindow of BrowserWindow.getAllWindows()) {
    for (const currentBrowserView of currentWindow.getBrowserViews()) {
      if (currentBrowserView.webContents.id === webContents.id) {
        return currentWindow
      }
    }
  }
  return undefined
}

export function getWindowFromWebContents (webContents: WebContents) {
  let window: BrowserWindow | undefined | null
  const webContentsType = webContents.getType()
  switch (webContentsType) {
    case 'webview':
      window = BrowserWindow.fromWebContents(webContents.hostWebContents)
      break
    case 'browserView':
      window = getWindowFromBrowserView(webContents)
      break
    default:
      window = BrowserWindow.fromWebContents(webContents)
      break
  }

  return window
}