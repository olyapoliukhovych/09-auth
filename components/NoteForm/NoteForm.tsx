"use client";

import css from "@/components/NoteForm/NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { NewNoteData } from "@/types/note";

export interface Tag {
  id: string;
  name: string;
}

interface NoteFormProps {
  tags: Tag[];
}

export default function NoteForm({ tags }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  const handleCancel = () => router.back();

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.label}>
        Title
        <input
          name="title"
          onChange={handleChange}
          defaultValue={draft?.title}
          placeholder="Title"
          minLength={3}
          maxLength={50}
          required
        />
      </label>
      <label className={css.label}>
        Content
        <textarea
          name="content"
          onChange={handleChange}
          defaultValue={draft?.content}
          placeholder="Enter text..."
          minLength={3}
          required
        />
      </label>
      <label className={css.label}>
        Tag
        <select name="tag" defaultValue={draft?.tag} onChange={handleChange}>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button type="submit" disabled={isPending} className={css.submitBtn}>
          {isPending ? "Saving..." : "Save note"}
        </button>
        <button type="button" onClick={handleCancel} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}
