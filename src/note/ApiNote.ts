import { ipcRenderer } from 'electron';
import { SavedData } from '../types/Note';

const CLASS = 'Note';

export const getNotes = (): SavedData[] => {
    return ipcRenderer.sendSync('electronStoreGet', 'notes', CLASS);
};

export const getNote = (idNote: string): SavedData | false => {
    return ipcRenderer.sendSync('electronStoreGet', 'notes.' + idNote, CLASS);
};

export const saveNote = (note: SavedData): boolean => {
    return ipcRenderer.sendSync(
        'electronStoreSet',
        'notes.' + note.time,
        note,
        CLASS
    );
};

export const deleteNote = (idNote: string): boolean => {
    return ipcRenderer.sendSync(
        'electronStoreDelete',
        'notes.' + idNote,
        CLASS
    );
};

export default {
    getNotes,
    getNote,
    saveNote,
    deleteNote,
};
