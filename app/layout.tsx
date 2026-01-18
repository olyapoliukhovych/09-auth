import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_NOTEHUB_TOKEN === "production"
      ? "https://notehub.app"
      : "http://localhost:3000",
  ),
  title: "NoteHub",
  description:
    "Manage, filter, and organize your notes efficiently with NoteHub.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "NoteHub - Your Personal Knowledge Base",
    description:
      "Manage, filter, and organize your notes efficiently with NoteHub.",
    url: "https://notehub.app",
    siteName: "NoteHub",
    images: [
      {
        url: "/meta-image.png",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub - Your Personal Knowledge Base",
    description:
      "Manage, filter, and organize your notes efficiently with NoteHub.",
    images: ["/meta-image.png"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <NextTopLoader
          color="#fde3c9"
          showSpinner={false}
          // shadow="0 0 10px #fde3c9,0 0 5px #fde3c9"
        />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              color: "#333",
              borderRadius: "10px",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#056237",
                secondary: "#fff",
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: "#dc3545",
                secondary: "#fff",
              },
            },
          }}
        />
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
