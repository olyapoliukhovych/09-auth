import { nextServer } from "./api";
import { headers } from "next/headers";

const getAuthHeaders = async () => {
  const headerStore = await headers();
  const cookie = headerStore.get("cookie");
  return cookie ? { cookie } : {};
};

export const fetchNotesServer = async (params: object) => {
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get("/notes", {
    params,
    headers: authHeaders,
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string) => {
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: authHeaders,
  });
  return data;
};

export const getMeServer = async () => {
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get("/users/me", {
    headers: authHeaders,
  });
  return data;
};

export const checkSessionServer = async () => {
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get("/auth/session", {
    headers: authHeaders,
  });
  return data;
};
