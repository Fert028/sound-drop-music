'use client';
import { useAudio } from '@/context/AudioContext';
import s from './Playlist.module.scss';

export default function PlaylistPage() {
  const { playlist, playTrack, currentTrack, isPlaying } = useAudio();

  // ПРОВЕРКА: Если данных еще нет, показываем загрузку
  if (!playlist || playlist.length === 0) {
    return <div className={s.container}>Загрузка треков...</div>;
  }

  return (
    <div className={s.container}>
      <h1>Мой плейлист</h1>
      <div className={s.list}>
        {playlist.map((track) => (
          <div 
            key={track.id} 
            // Используем опциональную цепочку currentTrack?.id
            className={`${s.trackItem} ${currentTrack?.id === track.id ? s.active : ''}`}
            onClick={() => playTrack(track)}
          >
            <div className={s.info}>
              <strong>{track.title}</strong>
              <span>{track.artist}</span>
            </div>
            {currentTrack?.id === track.id && isPlaying && (
              <div className={s.playingIndicator}>Playing...</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

