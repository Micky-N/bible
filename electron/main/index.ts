import { app, BrowserWindow, shell, ipcMain, ipcRenderer } from 'electron';
import { release } from 'node:os';
import { join } from 'node:path';
import Bible from '../../src/bible/Bible';
import { BibleStoreT } from '../../src/types/Bible';

process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
    win = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.PUBLIC, 'favicon.ico'),
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(url);
        win.webContents.openDevTools();
    } else {
        win.loadFile(indexHtml);
    }

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send(
            'main-process-message',
            new Date().toLocaleString()
        );
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url);
        return { action: 'deny' };
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
    let installExtension = require('electron-devtools-installer');
    installExtension
        .default(installExtension.VUEJS_DEVTOOLS)
        .then(() => {})
        .catch((err: any) => {
            console.log('Unable to install `vue-devtools`: \n', err);
        });
});

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg}`);
    } else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});

ipcMain.on('testaments', (event, state: BibleStoreT) => {
    event.returnValue = new Bible().fromState(state).getTestaments();
});

ipcMain.on('books', (event, state: BibleStoreT) => {
    event.returnValue = new Bible().fromState(state).getBooks(state.testament);
});

ipcMain.on('allBooks', (event, state: BibleStoreT) => {
    event.returnValue = new Bible().fromState(state).getAllBooks();
});

ipcMain.on('book', (event, state: BibleStoreT) => {
    event.returnValue = new Bible()
        .fromState(state)
        .getBook(state.testament, state.book);
});

ipcMain.on(
    'chapter',
    (
        event,
        state: BibleStoreT,
        idTestament: number,
        idBook: number,
        idChapter: number
    ) => {
        event.returnValue = new Bible()
            .fromState(state)
            .getChapter(idTestament, idBook, idChapter);
    }
);

ipcMain.on('verses', (event, state: BibleStoreT) => {
    event.returnValue = new Bible().fromState(state).getVerses(state);
});

ipcMain.on('version', (event, state: BibleStoreT) => {
    event.returnValue = new Bible().fromState(state).getVersion();
});

ipcMain.on('versions', (event) => {
    event.returnValue = new Bible().getVersions();
});

ipcMain.on(
    'autoCompleteBooks',
    (event, state: BibleStoreT, searchValue: string) => {
        event.returnValue = new Bible()
            .fromState(state)
            .getAutoCompleteBooks(searchValue);
    }
);

ipcMain.on('search', (event, state: BibleStoreT, searchText: string) => {
    event.returnValue = new Bible().fromState(state).search(searchText);
});

ipcMain.on('home', (event) => {
    event.sender.loadURL(url);
});

ipcMain.on('about', (event) => {
    event.sender.loadURL(url + 'about');
});
