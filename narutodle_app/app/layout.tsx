import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ninjaFont = localFont({
  src: "../public/font/njnaruto.ttf",
  variable: "--font-ninja",
});

export const metadata: Metadata = {
  title: "Narutodle Infinite",
  description: "Guess away, dattebayo!",
  icons: "/assets/favicon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ninjaFont.variable}>{children}</body>
    </html>
  );
}
