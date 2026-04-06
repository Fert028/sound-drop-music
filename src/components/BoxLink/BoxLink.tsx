
import s from "./BoxLink.module.scss";
import Box from "../Box/Box";
import Link from "next/link";
import { ChevronRight } from "@deemlol/next-icons";
import { handleMouseMove } from "@/handler/handleMouseMove";


interface BoxLinkProp {
  href: string;
  label: string;
}

export default function BoxLink({href, label}:BoxLinkProp) {
  return (
    <Link href={href} className={s.linkWrapper}>
      <Box mouseMove={handleMouseMove} className={s.box_link_glow}>
        <div className={s.box_header}>
          <ChevronRight size={24} strokeWidth={2} />
          {label}
        </div>
      </Box>
    </Link>
  )
}