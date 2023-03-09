import { ipcRenderer } from 'electron';
import { Note } from '../types/Note';
import crypto from 'crypto';

const CLASS = 'Note';

export const getNotes = (): Note[] => {
    return ipcRenderer.sendSync('electronStoreGet', 'notes', CLASS);
};

export const getNote = (idNote: string): Note | false => {
    return ipcRenderer.sendSync('electronStoreGet', 'notes.' + idNote, CLASS);
};

export const saveNote = (note: Note): boolean => {
    if (note.id == undefined) {
        note.id = crypto.randomUUID();
    }
    return ipcRenderer.sendSync(
        'electronStoreSet',
        'notes.' + note.id,
        JSON.parse(JSON.stringify(note)),
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

export const noteExists = (idNote: string): boolean => {
    return ipcRenderer.sendSync('electronStoreHas', 'notes.' + idNote, CLASS);
};

export const getImageFromLocal = (image: string) => {
    return ipcRenderer.sendSync('getImageFromLocal', image);
};

export default {
    getNotes,
    getNote,
    saveNote,
    deleteNote,
    noteExists,
    getImageFromLocal,
};
