import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrack } from "../../http/tracks/tracks";
import ImageCard from "../../components/image-card/ImageCard";
import trackPlaceholder from "../../assets/track-placeholder.png";
import Loader from "../../components/loader/Loader";
import millisToMinutes from "../../helpers/millisToMinutes";
import "./track.css";

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

  return (
    <div className={"track-root"}>
      <Loader isLoading={isLoading}>
        <h1>{track.name}</h1>
        <section id={"track-section"} className={"artist-info-section"}>
          <ImageCard
            id={track.id}
            height={"300px"}
            width={"300px"}
            images={track.album?.images}
            placeholder={trackPlaceholder}
          />
          {/* TODO: ADD STYLES HERE */}
          <div className={"track-info-text"}>
            <p>{`Type: ${track.type}.`}</p>
            <p id={"track-info-name"}>{`Name: ${track.name}.`}</p>
            <p>{`Artist: ${track?.artists
              ?.map((artist) => artist.name)
              .join(", ")}.`}</p>
            <p>{`Album: ${track?.album?.name}.`}</p>
            <p>{`Track number: ${track.track_number}.`}</p>
            <p id={"track-info-duration"}>{`Duration: ${millisToMinutes(
              track.duration_ms
            )}.`}</p>
            <p>{`Popularity: ${track.popularity}.`}</p>
          </div>
        </section>
      </Loader>
    </div>
  );
}

export default Track;
