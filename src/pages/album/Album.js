import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getAlbum } from "../../http/albums/albums";
import Loader from "../../components/loader/Loader";
import ImageCard from "../../components/image-card/ImageCard";
import albumPlaceholder from "../../assets/album-placeholder.jpg";
import "./album.css";
import { HOME_PATHNAME } from "../../routes/routes";

function Album() {
  let { albumId } = useParams();
  let history = useHistory();

  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performGetAlbum() {
      setIsLoading(true);
      try {
        const album = await getAlbum(albumId);
        setAlbum(album);
      } catch (error) {
        history.push(HOME_PATHNAME);
        console.log(error);
      }
      setIsLoading(false);
    }
    performGetAlbum();
  }, [albumId, history]);

  const hasGenresDefined = album.genres?.length > 0;

  return (
    <div className={"album-root"}>
      <Loader isLoading={isLoading}>
        <h1>{album.name}</h1>
        <section id={"album-section"} className={"album-info-section"}>
          <ImageCard
            id={album.id}
            height={"300px"}
            width={"300px"}
            images={album.images}
            placeholder={albumPlaceholder}
          />
          <div className={"album-info-text"}>
            <p>{`Type: ${album.type}.`}</p>
            <p id={"album-info-name"}>{`Name: ${album.name}.`}</p>
            <p>{`Artist: ${album?.artists
              ?.map((artist) => artist.name)
              .join(", ")}.`}</p>
            <p>{`Release: ${album.release_date}.`}</p>
            <p
              id={"album-info-total-tracks"}
            >{`Tracks: ${album.total_tracks} tracks.`}</p>
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
