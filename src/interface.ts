import { DownloadItem, SaveDialogOptions } from 'electron'

export interface DownloadFile {
  filename: string
  path: string
  fileSize: number
  mimeType: string
  url: string
}

export interface DownloadProgress {
  percent: number
  transferredBytes: number
  totalBytes: number
}

export interface DownloadOption {
  /**
   显示“另存为...”对话框，而不是立即下载。

   注意：仅在绝对必要时才使用此选项。直接下载而不提示是更好的用户体验。

   @default false
   */
  readonly saveAs?: boolean

  /**
   The directory to save the file in.

   Must be an absolute path.

   Default: [User's downloads directory](https://electronjs.org/docs/api/app/#appgetpathname)
   */
  directory?: string

  /**
   Name of the saved file.
   This option only makes sense for `electronDl.download()`.

   Default: [`downloadItem.getFilename()`](https://electronjs.org/docs/api/download-item/#downloaditemgetfilename)
   */
  readonly filename?: string

  /**
   Message of the error dialog. `{filename}` is replaced with the name of the actual file. Can be customized for localization.

   Note: Error dialog will not be shown in `electronDl.download()`. Please handle error manually.

   @default 'The download of {filename} was interrupted'
   */
  readonly errorMessage?: string

  /**
   Optional callback that receives the [download item](https://electronjs.org/docs/api/download-item).
   You can use this for advanced handling such as canceling the item like `item.cancel()`.
   */
  readonly onStarted?: (item: DownloadItem) => void

  /**
   Optional callback that receives an object containing information about the progress of the current download item.
   */
  readonly onProgress?: (progress: DownloadProgress, item: DownloadItem) => void

  /**
   可选回调，用于接收一个对象，该对象包含有关在任何注册窗口中完成的所有下载项目的组合进度的信息。

   每次开始新的下载时，下一个回调都会包含它。因此，进度百分比可能会再次变小。
   此回调提供与应用程序图标上的进度栏相同的数据。
   */
  readonly onTotalProgress?: (progress: DownloadProgress, item: DownloadItem) => void

  /**
   Optional callback that receives the [download item](https://electronjs.org/docs/api/download-item) for which the download has been cancelled.
   */
  readonly onCancel?: (item: DownloadItem) => void

  /**
   Optional callback that receives an object with information about an item that has been completed. It is called for each completed item.
   */
  readonly onCompleted?: (file: DownloadFile, item: DownloadItem) => void

  /**
   Reveal the downloaded file in the system file manager, and if possible, select the file.

   @default false
   */
  readonly openFolderWhenDone?: boolean

  /**
   Shows the file count badge on macOS/Linux dock icons when download is in progress.

   @default true
   */
  readonly showBadge?: boolean

  /**
   Allow downloaded files to overwrite files with the same name in the directory they are saved to.

   The default behavior is to append a number to the filename.

   @default false
   */
  readonly overwrite?: boolean
  dialogOptions?: SaveDialogOptions
  showProgressBar?: boolean
}

export enum NetStatus {
  Online = 'online',
  Offline = 'offline'
}

export class CancelError extends Error {
}