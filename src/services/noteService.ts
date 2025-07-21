import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;


export interface FetchNotesParams {
    search?: string;
    page?: number;
    perPage?: number;
}


export interface GenResponse {
    notes: Note[];
    totalPages: number;
    
}

export interface FetchNotesResponse {
    page: number;
    perPage: number
    notes: Note[];
    total_pages: number;
    
}

export const fetchNotes = async ({ search, page = 1, perPage=12}:FetchNotesParams): Promise<FetchNotesResponse> => {
 const config = {
        params: {
            page,
            perPage,
            ...( search && { search }), 
    },
        headers: {
            Authorization: `Bearer ${myKey}`
        },
    }
    const response = await axios.get<GenResponse>(
        'https://notehub-public.goit.study/api/notes',
         config
    );

    const notesres = response.data;

    return {
        page,
        perPage,
        notes: notesres.notes,
        total_pages: notesres.totalPages,
        
     };
        
}

export const createNote = async (note: {
    title: string;
    content: string;
    tag: NoteTag;
}): Promise<Note> => {
 const config = {
        params: {
          note, 
    },
        headers: {
            Authorization: `Bearer ${myKey}`
        },
    }



    const response = await axios.post<Note>(
        'https://notehub-public.goit.study/api/notes',
         config
    );

    return response.data;
};


export const deleteNote = async (id: number): Promise<Note> => {
 const config = {
        params: {
          id, 
    },
        headers: {
            Authorization: `Bearer ${myKey}`
        },
    }



    const response = await axios.delete<Note>(
        'https://notehub-public.goit.study/api/notes',
         config
    );

    return response.data;
};