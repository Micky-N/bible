import { OutputData } from '@editorjs/editorjs';
import ApiNote from '../note/ApiNote';

export type ApiNoteT = typeof ApiNote;

export type Note = OutputData & {
    title: string;
    id?: string;
};
