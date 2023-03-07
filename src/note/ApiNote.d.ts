declare const CLASS: string;

export function getNotes(): Note[];

export function getNote(idNote: string): Note | false;

export function saveNote(note: Note): boolean;

export function deleteNote(idNote: string): boolean;

export function noteExists(idNote: string): boolean;
