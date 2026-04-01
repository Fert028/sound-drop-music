'use client';
import { useState, useRef, useEffect, ReactNode, createContext, useContext } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  duration?: string;
}

interface AudioContextType {
  playlist?: Track[]; // Список всех треков
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  progress: number;        // Текущее время в секундах
  duration: number;        // Длительность в секундах
  seek: (time: number) => void; // Функция для перемотки
  favorites: number[]; // Массив ID лайкнутых треков
  toggleFavorite: (trackId: number) => void;
  setPlaylist: (newPlaylist: Track[]) => void
}


const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children, initialPlaylist = [] }: { children: ReactNode, initialPlaylist: Track[] }) => {
  const [playlist, setPlaylistState] = useState<Track[]>(initialPlaylist);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(initialPlaylist[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);


  useEffect(() => {
  if (!audioRef.current || !currentTrack) return;

  // Устанавливаем src только если он изменился
  if (audioRef.current.src !== window.location.origin + currentTrack.src) {
    audioRef.current.src = currentTrack.src;
    audioRef.current.load(); // Важно для смены файла
    
    // Если музыка должна играть — запускаем
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }
  }, [currentTrack]); // Сработает каждый раз, когда меняется объект трека

    // Загружаем лайки при старте
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Сохраняем лайки при каждом изменении
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (trackId: number) => {
    setFavorites(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId) // Убираем лайк
        : [...prev, trackId] // Добавляем лайк
    );
  };


    // Обновляем время при проигрывании
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  // Получаем длительность, когда трек загрузился
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Функция перемотки
  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

 const playTrack = (track: Track) => {
  if (!audioRef.current) return;

  // 1. Собираем ПОЛНЫЙ путь (добавляем домен: http://localhost:3000)
  const fullSrc = window.location.origin + track.src;

  if (currentTrack?.id === track.id) {
    togglePlay();
    return;
  }

  // 2. Сначала ставим данные
  setCurrentTrack(track);
  setIsPlaying(true);

  // 3. Жестко прописываем новый src и вызываем load
  audioRef.current.src = fullSrc;
  audioRef.current.load(); // Обязательно сбрасываем предыдущий поток

  // 4. Запускаем только ПОСЛЕ того, как браузер подтвердил, что готов
  const playPromise = audioRef.current.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Играет:", track.title);
      })
      .catch((error) => {
        console.error("Ошибка воспроизведения:", error);
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Если src почему-то пустой, восстанавливаем его
      if (!audio.src || audio.src.includes('undefined')) {
        audio.src = window.location.origin + currentTrack.src;
        audio.load();
      }
      
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Ошибка при toggle:", err));
    }
  };



  const nextTrack = () => {
    const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  };

  const prevTrack = () => {
    const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  };

  const setPlaylist = (newPlaylist: Track[]) => {
    if (newPlaylist.length > 0) {
      setPlaylistState(newPlaylist);
      // Передаем ПЕРВЫЙ элемент массива [0], чтобы не было ошибки типов
      playTrack(newPlaylist[0]); 
    }
  };

  return (
    <AudioContext.Provider value={{ 
      playlist,
      setPlaylist,
      currentTrack, 
      isPlaying, 
      playTrack, 
      togglePlay, 
      nextTrack, 
      prevTrack,
      progress, 
      duration, 
      seek,
      favorites, 
      toggleFavorite 
    }}>
      {children}
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack} // Автопереход на следующий трек
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  );
};


export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
