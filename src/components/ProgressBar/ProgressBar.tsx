"use client";

import { useRef, useState, useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

export default function ProgressBar() {
  const { progress, duration, seek } = useAudio();

  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percent = duration ? (progress / duration) * 100 : 0;

  const updatePosition = (clientX: number) => {
    if (!barRef.current || !duration) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));

    seek(percent * duration);
  };

  // 🎯 универсальный способ получить X
  const getClientX = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      return e.touches[0]?.clientX ?? 0;
    }
    return e.clientX;
  };

  // 🖱 + 📱 START
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    updatePosition(clientX);
  };

  // MOVE
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    updatePosition(getClientX(e));
  };

  // END
  const handleEnd = () => {
    setIsDragging(false);
  };

  // 🔥 глобальные события
  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);

      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={barRef}
      onMouseDown={(e) => handleStart(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      style={{
        height: "6px",
        width: "100%",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "999px",
        cursor: "pointer",
        position: "relative",
        touchAction: "none", // 🔥 ОЧЕНЬ ВАЖНО
      }}
    >
      {/* прогресс */}
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: "white",
          borderRadius: "999px",
        }}
      />

      {/* бегунок */}
      <div
        style={{
          position: "absolute",
          left: `${percent}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "white",
        }}
      />
    </div>
  );
}