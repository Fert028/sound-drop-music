
import { NextResponse } from 'next/server';
// Используйте относительный путь от этого файла до вашего JSON
import tracks from '@/data/tracks.json'; 

export async function GET() {
  try {
    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load tracks" }, { status: 500 });
  }
}
