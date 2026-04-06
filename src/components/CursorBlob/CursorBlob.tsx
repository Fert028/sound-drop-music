"use client";

import { useEffect, useRef } from "react";

export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      // 🧠 lerp (инерция)
      position.current.x += (target.current.x - position.current.x) * 0.1;
      position.current.y += (target.current.y - position.current.y) * 0.1;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={blobRef} className="cursorBlob" />;
}