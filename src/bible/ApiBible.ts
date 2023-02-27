import { ipcRenderer } from 'electron';

export const getBible = (): IBible => {
    return ipcRenderer.sendSync('bible') as IBible;
};

export const getVerse = (params) => {
    return ipcRenderer.sendSync('verses', params);
};

export const getBook = (params) => {
    return ipcRenderer.sendSync('book', params);
};

export default { getBible, getVerse, getBook };
