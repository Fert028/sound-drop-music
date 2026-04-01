'use client';
import TrackItem from "@/components/TrackItem/TrackItem";
import s from './TrackList.module.scss';
import { Track } from '@/context/AudioContext';

export default function TrackList({ tracks }: { tracks: Track[] }) {
  if (!tracks || tracks.length === 0) return <p>Список пуст</p>;

  return (
    <div className={s.list}>
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </div>
  );
}
