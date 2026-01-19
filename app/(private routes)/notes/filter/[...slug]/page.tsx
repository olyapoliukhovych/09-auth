import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotesServer } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { NoteTag } from "@/types/note";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || "all";
  const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `Notes: ${displayTag} | NoteHub`,
    description: `Browsing all notes filtered by category: ${displayTag}.`,
    openGraph: {
      title: `Notes: ${displayTag} | NoteHub`,
      description: `Browsing all notes filtered by category: ${displayTag}.`,
      url: `https://notehub.app/notes/filter/${displayTag}`,
      images: ["/meta-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes: ${displayTag} | NoteHub`,
      description: `Browsing all notes filtered by category: ${displayTag}.`,
      images: ["/meta-image.png"],
    },
  };
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const activeTag = slug?.[0] === "all" ? undefined : (slug?.[0] as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag],
    queryFn: () => fetchNotesServer({ page: 1, search: "", tag: activeTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient serverTag={activeTag} />
    </HydrationBoundary>
  );
}
