import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getArtist } from "../../http/artists/artists";
import Loader from "../../components/loader/Loader";
import ImageCard from "../../components/image-card/ImageCard";
import artistPlaceholder from "../../assets/artist-placeholder.jpeg";
import "./artist.css";
import { HOME_PATHNAME } from "../../routes/routes";

function Artist() {
  let { artistId } = useParams();
  let history = useHistory();

  const [artist, setArtist] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function performGetArtist() {
      setIsLoading(true);
      try {
        const artist = await getArtist(artistId);
        setArtist(artist);
      } catch (error) {
        history.push(HOME_PATHNAME);
        console.log(error);
      }
      setIsLoading(false);
    }
    performGetArtist();
  }, [artistId, history]);

  const hasGenresDefined = artist.genres?.length > 0;

  return (
    <div className={"artist-root"}>
      <Loader isLoading={isLoading}>
        <h1>{artist.name}</h1>
        <section id={"artist-section"} className={"artist-info-section"}>
          <ImageCard
            id={artist.id}
            height={"300px"}
            width={"300px"}
            images={artist.images}
            placeholder={artistPlaceholder}
          />
          <div className={"artist-info-text"}>
            <p>{`Type: ${artist.type}.`}</p>
            <p id={"artist-info-name"}>{`Name: ${artist.name}.`}</p>
            {hasGenresDefined && (
              <p>{`Genres: ${artist.genres.join(", ")}.`}</p>
            )}
            <p>{`Popularity: ${artist.popularity}.`}</p>
            <p>{`Followers: ${artist.followers?.total}.`}</p>
          </div>
        </section>
      </Loader>
    </div>
  );
}

export default Artist;
