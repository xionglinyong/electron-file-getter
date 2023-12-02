export function majorElectronVersion () {
  const version = process.versions.electron.split('.')
  return Number.parseInt(version[0], 10)
}