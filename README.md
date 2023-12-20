# electron-file-getter

A electron multi-file parallel download library, based on [electron-dl](https://github.com/sindresorhus/electron-dl/)
changes in:

- Support multi-file download at the same time
- Support detection of network disconnection and continue downloading after network recovery

## Installation

```bash
pnpm install electron-file-getter
```

## Usage

in `index.ts`:

```typescript
import { download } from 'electron-file-getter'
import { BrowserWindow, DownloadItem, ipcMain } from 'electron'

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
```

### Download options

The third parameter of the download function is an optional download option.

#### saveAs

Type: `boolean`\
Default: `false`

Show a `Save As…` dialog instead of downloading immediately.

Note: Only use this option when strictly necessary. Downloading directly without a prompt is a much better user
experience.

#### directory

Type: `string`\
Default: [User's downloads directory](https://electronjs.org/docs/api/app/#appgetpathname)

The directory to save the file in.

Must be an absolute path.

#### filename

Type: `string`\
Default: [`downloadItem.getFilename()`](https://electronjs.org/docs/api/download-item/#downloaditemgetfilename)

Name of the saved file.

This option only makes sense for `electronDl.download()`.

#### errorMessage

Type: `string`\
Default: `'The download of {filename} was interrupted'`

Message of the error dialog. `{filename}` is replaced with the name of the actual file. Can be customized for
localization.

Note: Error dialog will not be shown in `electronDl.download()`. Please handle error manually.

#### onStarted

Type: `Function`

Optional callback that receives the [download item](https://electronjs.org/docs/api/download-item).
You can use this for advanced handling such as canceling the item like `item.cancel()` which will
throw `electronDl.CancelError` from the `electronDl.download()` method.

#### onProgress

Type: `Function`

Optional callback that receives an object containing information about the progress of the current download item.

```
{
  percent: 0.1
  transferredBytes: 100,
  totalBytes: 1000
}
```

#### onTotalProgress

Type: `Function`

Optional callback that receives an object containing information about the combined progress of all download items done
within any registered window.

Each time a new download is started, the next callback will include it. The progress percentage could therefore become
smaller again.
This callback provides the same data that is used for the progress bar on the app icon.

```
{
  percent: 0.1,
  transferredBytes: 100,
  totalBytes: 1000
}
```

#### onCancel

Type: `Function`

Optional callback that receives the [download item](https://electronjs.org/docs/api/download-item) for which the
download has been cancelled.

#### onCompleted

Type: `Function`

Optional callback that receives an object with information about an item that has been completed. It is called for each
completed item.

```
{
  filename: 'file.zip',
  path: '/path/file.zip',
  fileSize: 503320,
  mimeType: 'application/zip',
  url: 'https://example.com/file.zip'
}
```

#### openFolderWhenDone

Type: `boolean`\
Default: `false`

Reveal the downloaded file in the system file manager, and if possible, select the file.

#### showBadge

Type: `boolean`\
Default: `true`

Show a file count badge on the macOS/Linux dock/taskbar icon when a download is in progress.

#### showProgressBar

Type: `boolean`\
Default: `true`

Show a progress bar on the dock/taskbar icon when a download is in progress.

#### overwrite

Type: `boolean`\
Default: `false`

Allow downloaded files to overwrite files with the same name in the directory they are saved to.

The default behavior is to append a number to the filename.

#### dialogOptions

Type: [`SaveDialogOptions`](https://www.electronjs.org/docs/latest/api/download-item#downloaditemsetsavedialogoptionsoptions)\
Default: `{}`

Customize the save dialog.

If `defaultPath` is not explicity defined, a default value is assigned based on the file path.

## Development

After making changes, run the automated tests(undone):

```
$ pnpm test
```

And before submitting a pull request, run the manual tests to manually verify that everything works:

```
pnpm run build
```

## License

[MIT](https://opensource.org/license/mit/)