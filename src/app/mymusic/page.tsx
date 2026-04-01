'use client'; // Обязательно добавь, если это файл в папке app

import s from "./page.module.scss";
import Section from "@/components/Section/Section";
import Box from "@/components/Box/Box";
import BackButton from "@/components/BackButton/BackButton";
import { useAudio } from '@/context/AudioContext';
import TrackList from '@/components/TrackList/TrackList';

export default function MyMusicPage() {
  // Достаем данные из контекста
  const { playlist, favorites } = useAudio();

  // 1. ЗАЩИТА: Если плейлист еще не загружен (undefined), показываем загрузку
  // Это уберет ошибку "playlist is undefined"
  if (!playlist) {
    return (
      <main className="main">
        <Section>
          <Box>
            <BackButton />
            <p>Загрузка медиатеки...</p>
          </Box>
        </Section>
      </main>
    );
  }

  // 2. ФИЛЬТРАЦИЯ: Теперь мы уверены, что playlist существует
  const favoriteTracks = playlist.filter(track => favorites.includes(track.id));

  return (
    <main className="main">
      <Section>
        <Box>
          <BackButton />

          <h1 style={{ margin: '20px 0' }}>Моя музыка</h1>

          {favoriteTracks.length > 0 ? (
            // Передаем отфильтрованные треки в компонент списка
            <TrackList tracks={favoriteTracks} />
          ) : (
            <div className={s.empty}>
              <p>Здесь пока пусто. Лайкни что-нибудь!</p>
            </div>
          )}
        </Box>
      </Section>
    </main>
  );
}
