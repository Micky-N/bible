import { SavedData } from '@editorjs/editorjs/types/data-formats';

declare const CLASS: string;

export function getNotes(): SavedData[];

export function getNote(idNote: string): SavedData | false;

export function saveNote(note: SavedData): boolean;

export function deleteNote(idNote: string): boolean;
