import { SavedData } from '../types/Note';

const CLASS = 'Note';

export const getNotes = (): SavedData[] => {
    return [];
};

export const getNote = (idNote: string): SavedData | false => {
    return false;
};

export const saveNote = (note: SavedData): boolean => {
    return true;
};

export const deleteNote = (idNote: string): boolean => {
    return true;
};

export default {
    getNotes,
    getNote,
    saveNote,
    deleteNote,
};
