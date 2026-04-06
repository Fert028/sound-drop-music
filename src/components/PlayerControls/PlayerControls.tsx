'use client';
import { useAudio } from '@/context/AudioContext';
import { FastForward, Rewind } from '@deemlol/next-icons';
import s from './PlayerControls.module.scss';
import Box from '../Box/Box';
import Image from 'next/image';
import PauseIcon from '@/components/Icons/Pause.svg';
import PlayIcon from '@/components/Icons/Play.svg';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useState, useRef, useEffect } from 'react';

export default function PlayerControls() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack} = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const sizeIcon: number = 24;

  // Синхронизация состояния Play/Pause из контекста с тегом audio
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {}); // catch для обработки блокировки автоплея
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]); // переигрываем при смене трека или клике

  if (!currentTrack) return null;


  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      // Если браузер еще "тупит" и выдает NaN или 0
      if (!audio.duration || isNaN(audio.duration)) {
        // Можно попробовать принудительно спросить через 100мс
        setTimeout(() => {
          if (audio.duration) setDuration(audio.duration);
        }, 100);
      } else {
        setDuration(audio.duration);
      }
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audio.readyState >= 1) { // 1 означает, что метаданные уже есть
      setDuration(audio.duration);
    }
  }, [currentTrack.src]);


  return (
    <Box className={s.container}>
      {/* Скрытый элемент аудио, который управляет звуком */}
      <audio
        key={currentTrack.src} // ВАЖНО: заставляет аудио-элемент "переродиться"
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={nextTrack}
      />

      <div className={s.info}>
        <div className={s.textInfo}>
          <span className={s.title}>{currentTrack.title}</span>
          <span className={s.artist}>{currentTrack.artist}</span>
        </div>
      </div>

      <ProgressBar current={currentTime} duration={duration} onChange={handleSeek} />

      <div className={s.buttons}>
        <button onClick={prevTrack} className={s.switchButton}><Rewind size={24} fill='#fff' /></button>
        <button onClick={togglePlay} className={s.togglePlay}>
          {isPlaying ? (
            <Image src={PauseIcon} alt='pause' width={sizeIcon} height={sizeIcon} unoptimized />
          ) : (
            <Image src={PlayIcon} alt='play' width={sizeIcon} height={sizeIcon} unoptimized style={{marginLeft: "4px"}} />
          )}
        </button>
        <button onClick={nextTrack} className={s.switchButton}><FastForward size={24} fill='#fff' /></button>
      </div>

      <div className={s.volumePlaceholder}></div> 
    </Box>
  );
}
