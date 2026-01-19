"use client";

import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { Spinner } from "@/components/Spinner/Spinner";
import toast from "react-hot-toast";
import { useEffect } from "react";

function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load note details");
      const timer = setTimeout(() => router.back(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, router]);

  return (
    <Modal onClose={() => router.back()} showBackButton={true}>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <div className={css.statusMessage}>
          <p>Something went wrong. Please try again later.</p>
        </div>
      ) : note ? (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>

            <div className={css.content}>{note.content}</div>

            <div className={css.bottomContent}>
              <span className={css.tag}>{note.tag}</span>
              <div className={css.date}>
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

export default NotePreviewClient;
