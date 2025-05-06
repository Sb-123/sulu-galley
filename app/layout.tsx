import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";


export const revalidate = 1000;

export const metadata: Metadata = {
  title: "sb-img-gallery",
  description: "It is created by sb51",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-6xl mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
