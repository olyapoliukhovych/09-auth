import { User } from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { Note, NoteTag } from "@/types/note";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
}

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: NoteTag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = async (params: FetchNotesParams):Promise<FetchNotesResponse> => {
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get("/notes", {
    ...authHeaders,
    params: {
      ...params,
    },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string):Promise<Note>  => {
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get(`/notes/${id}`, authHeaders);
  return data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
