'use client';

import Image from "next/image";
import s from "./page.module.scss";
import clsx from "clsx";
import Section from "@/components/Section/Section";
import Box from "@/components/Box/Box";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import { ChevronRight } from "@deemlol/next-icons";
import PlayPauseButton from "@/components/PlayPauseButton/PlayPauseButton";
import { useAudio } from "@/context/AudioContext";

export default function Home() {
  const { playlist, favorites } = useAudio();
  
  if (!playlist) return null;

  const favoriteTracks = playlist.filter(track => favorites.includes(track.id))

  return (
    <main className="main">
      {/* Верхний ряд */}
      {/* <Section className={s.section_top} h="128px">
        <Box className={s.header}>
          <Logo size={72}></Logo>
          Sound Drop Music
        </Box>
      </Section> */}

      {/* Средний ряд */}
      <Section>
        <Box w="320px"></Box>

        <Box>
          <div className={s.boxMusic_header}>
            <PlayPauseButton size={56} />
            <Link href={'/offers'} className={s.link}>
              Предложения
              <ChevronRight size={24} color="#fff" strokeWidth={2} />
            </Link>
          </div>
        </Box>

        <Box className={s.boxMusic}>
          <div className={s.boxMusic_header}>
            <PlayPauseButton track={favoriteTracks[0]} newPlaylist={favoriteTracks} size={56} />
            <Link href={'/mymusic'} className={s.link}>
              Моя музыка
              <ChevronRight size={24} color="#fff" strokeWidth={2} />
            </Link>
          </div>
        </Box>

      </Section>
    </main>
  );
}
