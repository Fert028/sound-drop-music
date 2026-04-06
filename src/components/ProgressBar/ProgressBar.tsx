'use client';

import s from './ProgressBar.module.scss';
import { ChangeEvent, useState, useEffect } from 'react';
import { formatTime } from '@/utils';

interface ProgressBarProps {
  current: number;
  duration: number;
  onChange: (value: number) => void;
}

export default function ProgressBar({ current, duration, onChange }: ProgressBarProps) {
  // Локальный стейт, чтобы ползунок двигался плавно и не "прыгал"
  const [localValue, setLocalValue] = useState(current);
  const [isDragging, setIsDragging] = useState(false);

  // Синхронизируем локальное значение с внешним временем, только если мы НЕ тянем ползунок
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(current);
    }
  }, [current, isDragging]);

  const progress = (localValue / duration) * 100 || 0;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(Number(e.target.value));
  };

  const handleChangeEnd = () => {
    setIsDragging(false);
    onChange(localValue); // Отправляем финальное значение в плеер
  };

  const handleChangeStart = () => {
    setIsDragging(true); // Замораживаем обновление от плеера, пока тянем
  };

  return (
    <div className={s.container}>
      <span className={s.time}>{formatTime(localValue)}</span>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={localValue}
        onMouseDown={handleChangeStart}
        onTouchStart={handleChangeStart}
        onChange={handleInput}
        onMouseUp={handleChangeEnd}
        onTouchEnd={handleChangeEnd}
        className={s.range}
        style={{
          background: `linear-gradient(to right, #cbff2e ${progress}%, #4d4d4d ${progress}%)`
          // background: `linear-gradient(to right, #3dd2b2 ${progress}%, #4d4d4d ${progress}%)`
        }}
      />
      <span className={s.time}>{formatTime(duration)}</span>
    </div>
  );
}
