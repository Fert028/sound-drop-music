import s from "./Logo.module.scss";
import Image from "next/image";
import Link from "next/link";

interface logoProp {
  size?: number;
}

export default function Logo({size}:logoProp) {
  const s = size ? size : 64;

  return (
    <Link href={"/"}>
      <Image
        src="/sdm-logo.svg" 
        alt="SDM logo"
        width={s}
        height={s}
        priority
      />
    </Link>
  )
}