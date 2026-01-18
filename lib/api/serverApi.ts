import { User } from "@/types/user";
import { nextServer } from "./api";
import { cookies, headers } from "next/headers";

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

// export const getMeServer = async () => {
//   const authHeaders = await getAuthHeaders();
//   const { data } = await nextServer.get("/users/me", {
//     headers: authHeaders,
//   });
//   return data;
// };

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// export const checkSessionServer = async () => {
//   const authHeaders = await getAuthHeaders();
//   const { data } = await nextServer.get("/auth/session", {
//     headers: authHeaders,
//   });
//   return data;
// };

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
