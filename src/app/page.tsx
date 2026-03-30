import Image from "next/image";
import s from "./page.module.scss";
import clsx from "clsx";
import Section from "@/components/Section/Section";
import Box from "@/components/Box/Box";
import Logo from "@/components/Logo/Logo";

export default function Home() {
  return (
    <main className={s.main}>
      {/* Верхний ряд */}
      <Section className={s.section_top} h="128px">
        <Box className={s.header}>
          <Logo size={72}></Logo>
          Sound Drop Music
        </Box>
        <Box w="344px">Моя музыка</Box>
        <Box className={s.myMusic} w="344px">Предложения</Box>
      </Section>

      {/* Средний ряд */}
      <Section>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Section>

      {/* Нижний ряд */}
      <Section h="128px">
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Section>

    </main>
  );
}
