import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./styles/globals.scss";
import { AudioProvider } from '@/context/AudioContext';
import PlayerControls from '@/components/PlayerControls/PlayerControls';
import Section from "@/components/Section/Section";
import Header from "@/components/Header/Header";

const jost = Jost({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "SDM",
  description: "Sound Drop Music",
};

async function getTracks() {
  // На сервере указываем полный путь или импортируем напрямую из файла
  const res = await fetch('http://localhost:3000/api/tracks', { cache: 'no-cache' });
  return res.json();
}


export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const tracks = await getTracks();

  return (
    <html lang="en" className={`${jost.variable}`}>
      <body>
        <Header />
        <AudioProvider initialPlaylist={tracks}>
          {children}
          <Section h="min-content">
            <PlayerControls />
          </Section>
        </AudioProvider>
      </body>
    </html>
  );
}
