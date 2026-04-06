"use client";

import s from "./Navbar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { handleMouseMove } from "@/handler/handleMouseMove";
import MagneticItem from "../MagneticItem";

const navItems = [
  { label: "Главная", href: "/" },
  { label: "Предложения", href: "/offers" },
  { label: "Моя музыка", href: "/mymusic" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={s.nav} onMouseMove={handleMouseMove}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <MagneticItem key={item.href}>
            <Link href={item.href} className={s.link}>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className={s.activePill}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    mass: 0.6,
                  }}
                />
              )}

              <span className={isActive ? s.activeText : ""}>
                {item.label}
              </span>
            </Link>
          </MagneticItem>
        );
      })}
    </nav>
  );
}

// function MagneticItem({ children }: { children: React.ReactNode }) {
//   const ref = useRef<HTMLDivElement>(null);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const rect = ref.current?.getBoundingClientRect();
//     if (!rect) return;

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const moveX = (x - rect.width / 2) * 0.3;
//     const moveY = (y - rect.height / 2) * 0.3;

//     ref.current!.style.transform = `translate(${moveX}px, ${moveY}px)`;
//   };

//   const handleLeave = () => {
//     if (ref.current) {
//       ref.current.style.transform = "translate(0,0)";
//     }
//   };

//   return (
//     <div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleLeave}
//       style={{transition: `transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)`}}
//     >
//       {children}
//     </div>
//   );
// }