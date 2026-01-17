"use client";

import { useState } from "react";
// import { useParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "@/app/notes/NotesPage.module.css";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
import Link from "next/link";

export default function NotesClient({ serverTag }: { serverTag?: string }) {
  // const params = useParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  // const [isCreateOpen, setIsCreateOpen] = useState(false);

  // const slug = params.slug;
  // const activeTag =
  //   serverTag ??
  // Array.isArray(slug) ? slug[0] : slug === "all" ? undefined : slug;

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch, serverTag],
    queryFn: () => fetchNotes(page, debouncedSearch, serverTag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.createLink}>
          Create note +
        </Link>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p className={css.noNotesMsg}>No notes found.</p>
      )}

      {/* {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)} showBackButton={false}>
          <NoteForm onClose={() => setIsCreateOpen(false)} />
        </Modal>
      )} */}
    </div>
  );
}
