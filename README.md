# electron-download

A electron multi-file parallel download library, based on [electron-dl](https://github.com/sindresorhus/electron-dl/)
changes in:

- Support multi-file download at the same time
- Support detection of network disconnection and continue downloading after network recovery

## Installation

```bash
pnpm install electron-download
```

## Usage

in `main.ts`:

```typescript
import { download } from 'electron-download'
import { BrowserWindow } from 'electron'

enum DownLoadEvent {
  Download = 'Download',
  Started = 'DownloadStarted',
  Progress = 'DownloadProgress',
  Completed = 'DownloadCompleted',
  Cancel = 'DownloadCancel'
}

function listenerDownload (window: BrowserWindow) {
  const dlItemMap = new WeakMap<DownloadItem, number>()
  ipcMain.on(DownLoadEvent.Download, (_, url) => {
    window &&
    download(window, url, {
      onStarted (item) {
        const time = Date.now()
        dlItemMap.set(item, time)
        window.webContents.send(DownLoadEvent.Started, time, item.getFilename())
      },
      onProgress (p, item) {
        window.webContents.send(DownLoadEvent.Progress, dlItemMap.get(item), p)
      },
      onCancel (item) {
        window.webContents.send(DownLoadEvent.Cancel, dlItemMap.get(item))
      },
      onCompleted (file, item) {
        window.webContents.send(DownLoadEvent.Completed, dlItemMap.get(item), file)
        dlItemMap.delete(item)
      }
    })
  })
}

listenerDownload()
```

## License

[MIT](https://opensource.org/license/mit/)