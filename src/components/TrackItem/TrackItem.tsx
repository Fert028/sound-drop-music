'use client';

import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, Star } from '@deemlol/next-icons';
import s from './TrackItem.module.scss';
import { Track } from '@/context/AudioContext'; // Импортируй интерфейс

interface TrackItemProps {
  track: Track;
}

export default function TrackItem({ track }: TrackItemProps) {
  const { currentTrack, isPlaying, playTrack, favorites, toggleFavorite } = useAudio();

  const isCurrent = currentTrack?.id === track.id;
  const isFavorite = favorites.includes(track.id);
  const showPause = isCurrent && isPlaying;

  return (
    <div 
      className={`${s.trackItem} ${isCurrent ? s.active : ''}`}
      onClick={() => playTrack(track)}
    >
      <div className={s.mainInfo}>
        <div className={s.coverWrapper}>
          {/* <Image 
            src={track.cover || '/covers/default.png'} 
            alt={track.title} 
            width={36} 
            height={36} 
            className={s.cover}
          /> */}
          <div className={s.playOverlay}>
            {showPause ? <Pause size={16} /> : <Play size={16} />}
          </div>
        </div>

        <div className={s.meta}>
          <span className={s.title}>{track.title}</span>
          <span className={s.artist}>{track.artist}</span>
        </div>
      </div>

      <div className={s.actions}>
        <button 
          className={`${s.heartBtn} ${isFavorite ? s.favorite : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(track.id);
          }}
        >
          <Star 
            size={24} 
            fill={isFavorite ? "#fff" : "none"} 
            color={isFavorite ? "#fff" : "#fff"} 
            className={s.icon_star}
          />
        </button>
        <span className={s.duration}>{track.duration || '0:00'}</span>
      </div>
    </div>
  );
}
