'use client';

import s from "./page.module.scss";
import Section from "@/components/Section/Section";
import Box from "@/components/Box/Box";
import BoxLink from "@/components/BoxLink/BoxLink";


export default function Home() {
  const hrefItems = [
  { label: "Предложения", href: "/offers" },
  { label: "Моя музыка", href: "/mymusic" }
];
  return (
    // <main className="main">
      <Section h="100%">
        <Box></Box>

        <div className={s.section_music}>

          {hrefItems.map(( item ) => (
            <BoxLink key={item.href} href={item.href} label={item.label} />
          ))}

          {/* <Box>
            <div className={s.boxMusic_header}>
              <Link href={'/offers'} className={s.link}>
                Предложения
                <ChevronRight size={24} strokeWidth={2} />
              </Link>
            </div>
          </Box>

          <Box className={s.boxMusic}>
            <div className={s.boxMusic_header}>
              <Link href={'/mymusic'} className={s.link}>
                Моя музыка
                <ChevronRight size={24} strokeWidth={2} />
              </Link>
            </div>
          </Box> */}

        </div>

      </Section>
    // </main>
  );
}
