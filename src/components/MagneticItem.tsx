
import { useRef } from "react";

interface MagneticItemProp {
  children: React.ReactNode;
  w?: string;
  h?: string;
  className?: string;
}

export default function MagneticItem({children, w, h, className}: MagneticItemProp) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) * 0.2;
    const moveY = (y - rect.height / 2) * 0.2;

    ref.current!.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0,0)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{transition: `transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)`, width: w, height: h}}
      className={className}
    >
      {children}
    </div>
  );
}