'use client';

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  duration?: number;
  album?: string;
}

interface AudioContextType {
  playlist: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;

  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;

  progress: number;
  duration: number;
  seek: (time: number) => void;

  favorites: number[];
  toggleFavorite: (trackId: number) => void;

  setPlaylist: (tracks: Track[]) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({
  children,
  initialPlaylist = [],
}: {
  children: ReactNode;
  initialPlaylist: Track[];
}) => {
  const [playlist, setPlaylist] = useState<Track[]>(initialPlaylist);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(
    initialPlaylist[0] || null
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  // 🎵 Загружаем новый трек
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.src;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  // ▶️ play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // ❤️ favorites
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (trackId: number) => {
    setFavorites((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  // ⏱ progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // 🎯 play track
  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying((prev) => !prev);
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // ⏭ next / prev
  const nextTrack = () => {
    if (!currentTrack) return;

    const index = playlist.findIndex((t) => t.id === currentTrack.id);
    const next = (index + 1) % playlist.length;

    setCurrentTrack(playlist[next]);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    if (!currentTrack) return;

    const index = playlist.findIndex((t) => t.id === currentTrack.id);
    const prev = (index - 1 + playlist.length) % playlist.length;

    setCurrentTrack(playlist[prev]);
    setIsPlaying(true);
  };


  useEffect(() => {
  if (!currentTrack) return;

  const data = {
    track: currentTrack,
    progress,
    isPlaying,
  };

  localStorage.setItem("player-state", JSON.stringify(data));
  }, [currentTrack, progress, isPlaying]);

  useEffect(() => {
    const saved = localStorage.getItem("player-state");
    if (!saved) return;

    const { track, progress, isPlaying } = JSON.parse(saved);

    setCurrentTrack(track);
    setProgress(progress);
    setIsPlaying(isPlaying);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.currentTime = progress;
  }, [currentTrack]);


  return (
    <AudioContext.Provider
      value={{
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
        toggleFavorite,
      }}
    >
      {children}

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};