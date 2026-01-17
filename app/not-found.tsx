import { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent/NotFoundContent";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description: "Sorry, the page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description:
      "Sorry, the page you are looking for does not exist on NoteHub.",
    url: "https://notehub.app/not-found",
    images: [
      {
        url: "/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Page Not Found",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | NoteHub",
    description:
      "Sorry, the page you are looking for does not exist on NoteHub.",
    images: ["/meta-image.png"],
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
