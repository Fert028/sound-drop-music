import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./styles/globals.scss";

const jost = Jost({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "SDM",
  description: "Sound Drop Music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
