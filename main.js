const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let currentFilePath = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('renderer/index.html');

    // Create the menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    click: async () => {
                        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile'],
                            filters: [{ name: 'All Files', extensions: ['*'] }],
                        });
                        if (!canceled && filePaths.length > 0) {
                            const content = fs.readFileSync(filePaths[0], 'utf-8');
                            currentFilePath = filePaths[0];
                            mainWindow.webContents.send('file-opened', content);
                        }
                    },
                },
                {
                    label: 'Save',
                    click: () => {
                        if (currentFilePath) {
                            mainWindow.webContents.send('save-file', currentFilePath);
                        } else {
                            mainWindow.webContents.send('save-as-file');
                        }
                    },
                },
                {
                    label: 'Save As',
                    click: () => {
                        mainWindow.webContents.send('save-as-file');
                    },
                },
                { type: 'separator' },
                { role: 'quit' },
            ],
        },
        { label: 'Edit', role: 'editMenu' },
        { label: 'View', role: 'viewMenu' },
        { label: 'Window', role: 'windowMenu' },
    ]);
    Menu.setApplicationMenu(menu);
});

ipcMain.handle('save-file-content', (_, content, filePath) => {
    fs.writeFileSync(filePath, content, 'utf-8');
    currentFilePath = filePath;
    return filePath;
});

ipcMain.handle('dialog:saveAs', async (_, content) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
        filters: [{ name: 'All Files', extensions: ['*'] }],
    });
    if (!canceled && filePath) {
        fs.writeFileSync(filePath, content, 'utf-8');
        currentFilePath = filePath;
        return filePath;
    }
    return null;
});
