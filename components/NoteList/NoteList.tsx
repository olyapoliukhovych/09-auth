import css from "@/components/NoteList/NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import { Note } from "@/types/note";
import Link from "next/link";
import toast from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully!");
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <Link href={`/notes/${id}`} className={css.noteLink}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
          </Link>

          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button
              onClick={() => {
                mutate(id);
              }}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
