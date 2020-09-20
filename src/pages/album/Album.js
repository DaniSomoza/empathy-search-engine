import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbum } from "../../http/albums/albums";
import Loader from "../../loader/Loader";
import ImageCard from "../../components/image-card/ImageCard";
import albumPlaceholder from "../../assets/album-placeholder.jpg";
import "./album.css";

function Album() {
  let { albumId } = useParams();

  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performGetAlbum() {
      setIsLoading(true);
      try {
        const album = await getAlbum(albumId);
        setAlbum(album);
      } catch (error) {
        // TODO: handle unhappypath
        // redirect to 404???
        console.log(error);
      }
      setIsLoading(false);
    }
    performGetAlbum();
  }, [albumId]);

  const hasGenresDefined = album.genres?.length > 0;

  return (
    <div className={"album-root"}>
      <Loader isLoading={isLoading}>
        {/* TODO: ADD BACK BUTTON */}
        <h1>{album.name}</h1>
        <section className={"album-info-section"}>
          <ImageCard
            height={"300px"}
            width={"300px"}
            images={album.images}
            placeholder={albumPlaceholder}
          />
          {/* TODO: ADD STYLES HERE */}
          <div className={"album-info-text"}>
            <p>{`Type: ${album.type}.`}</p>
            <p>{`Name: ${album.name}.`}</p>
            {/* TODO: ADD OnClick to artist HERE??? */}
            <p>{`Artist: ${album?.artists
              ?.map((artist) => artist.name)
              .join(", ")}.`}</p>
            <p>{`Release: ${album.release_date}.`}</p>
            <p>{`Tracks: ${album.total_tracks} tracks.`}</p>
            <p>{`Label: ${album.label}.`}</p>
            {hasGenresDefined && <p>{`Genres: ${album.genres.join(", ")}.`}</p>}
            <p>{`Popularity: ${album.popularity}.`}</p>
          </div>
        </section>
      </Loader>
    </div>
  );
}

export default Album;
