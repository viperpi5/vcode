const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  version: process.versions.electron
});
