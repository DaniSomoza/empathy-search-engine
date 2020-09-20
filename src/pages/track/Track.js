import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrack } from "../../http/tracks/tracks";
import Loader from "../../loader/Loader";
import ImageCard from "../../components/image-card/ImageCard";
import trackPlaceholder from "../../assets/track-placeholder.png";
import "./track.css";
import millisToMinutes from "../../helpers/millisToMinutes";

function Track() {
  let { trackId } = useParams();

  const [track, setTrack] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performGetTrack() {
      setIsLoading(true);
      try {
        const track = await getTrack(trackId);
        setTrack(track);
      } catch (error) {
        // TODO: handle unhappypath
        // redirect to 404???
        console.log(error);
      }
      setIsLoading(false);
    }
    performGetTrack();
  }, [trackId]);

  console.log(track);

  return (
    <div className={"artist-root"}>
      <Loader isLoading={isLoading}>
        {/* TODO: ADD BACK BUTTON */}
        <h1>{track.name}</h1>
        <section className={"artist-info-section"}>
          <ImageCard
            height={"300px"}
            width={"300px"}
            images={track.album?.images}
            placeholder={trackPlaceholder}
          />
          {/* TODO: ADD STYLES HERE */}
          <div className={"artist-info-text"}>
            <p>{`Type: ${track.type}.`}</p>
            <p>{`Name: ${track.name}.`}</p>
            <p>{`Artist: ${track?.artists
              ?.map((artist) => artist.name)
              .join(", ")}.`}</p>
            <p>{`Album: ${track?.album?.name}.`}</p>
            <p>{`Track number: ${track.track_number}.`}</p>
            <p>{`Duration: ${millisToMinutes(track.duration_ms)}.`}</p>
            <p>{`Popularity: ${track.popularity}.`}</p>
          </div>
        </section>
      </Loader>
    </div>
  );
}

export default Track;
