import { User } from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { NoteTag } from "@/types/note";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
}

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export const fetchNotesServer = async (params: FetchNotesParams) => {
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get("/notes", {
    ...authHeaders,
    params: {
      page: params.page || 1,
      perPage: params.perPage || 12,
      sortBy: params.sortBy || "created",
      ...params,
    },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string) => {
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
