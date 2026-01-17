import { nextServer } from "./api";
import { Note } from "../../types/note";

// notes
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    search,
    perPage: 12,
  };

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteContent: object): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", noteContent);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

// auth
// register
// login
// logout
// checkSession

// user
// getMe
// updateMe
