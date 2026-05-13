'use client';

import s from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import { User } from "@deemlol/next-icons";

export default function Header() {
  return (
    <header className={s.header}>
      <Link href={'/'} className={s.logo_title}>
        <Image
          src="/sdm-logo.svg" 
          alt="SDM logo"
          width={36}
          height={36}
        />
        <h2>Sound Drop Music</h2>
      </Link>
      <Link href={'/'}><User color="#fff" size={28} /></Link>
      <Navbar />
    </header>
  )
}
