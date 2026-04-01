'use client';
import { useAudio } from '@/context/AudioContext';
import s from './SeekBar.module.scss';

export default function SeekBar() {
  const { progress, duration, seek } = useAudio();

  // Форматируем секунды в 0:00
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={s.wrapper}>
      <span>{formatTime(progress)}</span>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={(e) => seek(Number(e.target.value))}
        className={s.slider}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
}
