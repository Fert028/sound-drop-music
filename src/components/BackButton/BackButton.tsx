'use client';
import s from "./BackButton.module.scss";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "@deemlol/next-icons";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className={s.button} onClick={() => router.back()}>
      <ChevronLeft size={24} color="#fff" strokeWidth={2} />
    </button>
  )
}