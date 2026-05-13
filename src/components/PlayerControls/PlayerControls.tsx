"use client";

import { useAudio } from "@/context/AudioContext";
import { FastForward, Rewind, Pause, Play } from "@deemlol/next-icons";
import s from "./PlayerControls.module.scss";
import Box from "../Box/Box";
import ProgressBar from "../ProgressBar/ProgressBar";
import { formatTime } from "@/utils";

export default function PlayerControls() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    progress,
    duration,
  } = useAudio();

  if (!currentTrack) return null;

  return (
    <Box className={s.container}>
      <div className={s.info}>
        <div className={s.textInfo}>
          <span className={s.title}>{currentTrack.title}</span>
          <span className={s.artist}>{currentTrack.artist}</span>
        </div>
      </div>

      {/* 🎚 ПРОГРЕСС */}
      <div className={s.range_container}>
        <span>{formatTime(progress)}</span>
        <ProgressBar />
        <span>{formatTime(duration)}</span>
      </div>

      {/* 🎛 КНОПКИ */}
      <div className={s.buttons}>
        <button onClick={prevTrack} className={s.switchButton}>
          <Rewind size={24} fill="#fff" />
        </button>

        <button onClick={togglePlay} className={s.togglePlay}>
          {isPlaying ? (
            <Pause size={24} fill="#fff" />
          ) : (
            <Play size={24} fill="#fff" style={{ marginLeft: "2px" }} />
          )}
        </button>

        <button onClick={nextTrack} className={s.switchButton}>
          <FastForward size={24} fill="#fff" />
        </button>
      </div>

      <div className={s.volumePlaceholder}></div>
    </Box>
  );
}