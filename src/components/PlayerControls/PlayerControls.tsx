'use client';
import { useAudio } from '@/context/AudioContext';
import { SkipForward, SkipBack } from '@deemlol/next-icons';
import s from './PlayerControls.module.scss';
import Box from '../Box/Box';
import Image from 'next/image';
import PauseIcon from '@/components/Icons/Pause.svg';
import PlayIcon from '@/components/Icons/Play.svg';

export default function PlayerControls() {
  const { 
    currentTrack, isPlaying, togglePlay, nextTrack, prevTrack,
    progress, duration, seek // Достаем новые данные
  } = useAudio();
  
  const sizeIcon: number = 28;

  if (!currentTrack) return null;

  // Функция для красивого отображения времени (0:00)
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box className={s.container}>
      <div className={s.info}>
        <div className={s.coverWrapper}>
          <Image 
            src={currentTrack.cover || '/covers/default.png'} // Заглушка, если нет обложки
            alt={currentTrack.title}
            width={56}
            height={56}
            className={s.cover}
          />
        </div>
        <div className={s.textInfo}>
          <span className={s.title}>{currentTrack.title}</span>
          <span className={s.artist}>{currentTrack.artist}</span>
        </div>
      </div>


      {/* 2. Центральный блок: Кнопки + Полоса */}
      <div className={s.mainControls}>
        <div className={s.buttons}>
          <button onClick={prevTrack} className={s.switchButton}><SkipBack size={24} /></button>
          <button onClick={togglePlay} className={s.togglePlay}>
            {isPlaying ? (
              <Image src={PauseIcon} alt='pause' width={sizeIcon} height={sizeIcon} unoptimized />
            ) : (
              <Image src={PlayIcon} alt='play' width={sizeIcon} height={sizeIcon} unoptimized style={{marginLeft: "4px"}} />
            )}
          </button>
          <button onClick={nextTrack} className={s.switchButton}><SkipForward size={24} /></button>
        </div>

        {/* SeekBar прямо здесь */}
        <div className={s.seekbar}>
          <span className={s.time}>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className={s.slider}
          />
          <span className={s.time}>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* 3. Блок справа (будущая громкость) */}
      <div className={s.volumePlaceholder}></div> 
    </Box>
  );
}
