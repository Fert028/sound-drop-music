'use client';

import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import PlayIcon from '@/components/Icons/Play.svg';
import PauseIcon from '@/components/Icons/Pause.svg';
import s from './PlayPauseButton.module.scss';
import { Track } from '@/context/AudioContext';
import clsx from 'clsx';

interface PlayPauseButtonProps {
  track?: Track;
  newPlaylist?: Track[];
  size?: number;
  className?: string;
}

export default function PlayPauseButton({ track, newPlaylist, size = 24, className }: PlayPauseButtonProps) {
  const { currentTrack, isPlaying, togglePlay, playTrack, setPlaylist, playlist } = useAudio();

  // Определяем, активен ли этот конкретный трек
  const isCurrent = track ? currentTrack?.id === track.id : true;
  const activePlaying = isCurrent && isPlaying;
    // Проверяем: играет ли сейчас трек из ТОГО ЖЕ списка, который мы передали?
  const isThisPlaylistPlaying = (newPlaylist && newPlaylist.length > 0)
    ? currentTrack?.id === newPlaylist[0].id && isPlaying
    : isPlaying;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Если передали новый список и он не пустой
    if (newPlaylist && newPlaylist.length > 0) {
      // Если первый трек этого списка уже является текущим — просто пауза/плей
      if (currentTrack?.id === newPlaylist[0].id) {
        togglePlay();
      } else {
        setPlaylist(newPlaylist);
      }
      return;
    }

    // Логика для одиночного трека
    if (track) {
      currentTrack?.id === track.id ? togglePlay() : playTrack(track);
    } else {
      togglePlay();
    }
  };

  //   if (track) {
  //     // Если кнопка привязана к треку
  //     if (isCurrent) {
  //       togglePlay();
  //     } else {
  //       playTrack(track);
  //     }
  //   } else {
  //     // Если кнопка глобальная (для всего плеера или страницы)
  //     togglePlay();
  //   }
  // };

  const sizeImage = size * .6;

  return (
    <button 
      onClick={handleClick} 
      className={clsx(s.button, className)}
      style={{width: size, height: size}}
      aria-label={activePlaying ? "Pause" : "Play"}
    >
      <Image 
        src={isThisPlaylistPlaying ? PauseIcon : PlayIcon} 
        alt={activePlaying ? "pause" : "play"} 
        width={sizeImage} 
        height={sizeImage} 
        unoptimized
        style={!activePlaying ? { marginLeft: '2px' } : {}} // Визуальная центровка треугольника
      />
    </button>
  );
}
