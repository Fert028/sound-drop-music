import s from "./page.module.scss";
import Section from "@/components/Section/Section";
import Box from "@/components/Box/Box";
import BackButton from "@/components/BackButton/BackButton";
import TrackList from "@/components/TrackList/TrackList";
import tracks from "@/data/tracks.json";

export default function OffersPage() {
  return (
    <main className="main">
      <Section>
        <Box>
          <BackButton />
          <h1 style={{ margin: '20px 0' }}>Предложения</h1>
          <TrackList tracks={tracks} />
        </Box>
      </Section>
    </main>
  )
}