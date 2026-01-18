import { User } from "@/types/user";
import { nextServer } from "./api";
import { Tag } from "@/components/NoteForm/NoteForm";
import toast from "react-hot-toast";

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// notes
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

export async function fetchTags(): Promise<Tag[]> {
  return [
    { id: "1", name: "Todo" },
    { id: "2", name: "Work" },
    { id: "3", name: "Personal" },
    { id: "4", name: "Meeting" },
    { id: "5", name: "Shopping" },
  ];
}

// auth
// register
export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

// login

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

// checkSession

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

// logout
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

// user
// getMe
export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

// updateMe
export const updateMe = async (data: { username: string }) => {
  const res = await nextServer.patch("/users/me", data);
  return res.data;
};

// push notifications
nextServer.interceptors.response.use(
  (response) => {
    if (
      response.config.method === "patch" ||
      response.config.method === "put"
    ) {
      toast.success("Changes saved successfully!");
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong";

    if (status === 401) return Promise.reject(error);

    if (status === 400) toast.error(`Validation Error: ${message}`);
    else if (status === 403) toast.error("Access denied!");
    else if (status === 404) toast.error("Resource not found");
    else if (status === 500) toast.error("Server error, try again later");
    else toast.error(message);

    return Promise.reject(error);
  },
);

export const notify = {
  loginSuccess: () => toast.success("Logged in successfully"),
  logoutSuccess: () => toast.success("Logged out successfully"),
  registerSuccess: () => toast.success("Account created! Please sign in."),
};
