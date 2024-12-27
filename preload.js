const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fileApi', {
    onFileOpened: (callback) => ipcRenderer.on('file-opened', (_, content) => callback(content)),
    onSaveFile: (callback) => ipcRenderer.on('save-file', (_, filePath) => callback(filePath)),
    onSaveAsFile: (callback) => ipcRenderer.on('save-as-file', () => callback()),
    saveFileContent: (content, filePath) => ipcRenderer.invoke('save-file-content', content, filePath),
    saveAs: (content) => ipcRenderer.invoke('dialog:saveAs', content),
});
