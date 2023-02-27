import { ipcRenderer } from 'electron';

export default class Api {
    static getBible() {
        return ipcRenderer.sendSync('bible')
    }
}
