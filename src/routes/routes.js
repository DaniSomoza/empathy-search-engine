import Home from "../pages/home/Home";
import Album from "../pages/album/Album";
import Track from "../pages/track/Track";
import Artist from "../pages/artist/Artist";

const BASE_PATHNAME = process.env.PUBLIC_URL + "/";

export const HOME_PATHNAME = `${BASE_PATHNAME}`;
export const ARTIST_PATHNAME = `${BASE_PATHNAME}artists`;
export const ALBUM_PATHNAME = `${BASE_PATHNAME}albums`;
export const TRACK_PATHNAME = `${BASE_PATHNAME}tracks`;

const HOME_ROUTE = {
  pathname: HOME_PATHNAME,
  path: HOME_PATHNAME,
  Component: Home,
};

const ARTIST_ROUTE = {
  pathname: ARTIST_PATHNAME,
  path: `${ARTIST_PATHNAME}/:artistId`,
  Component: Artist,
};

const ALBUM_ROUTE = {
  pathname: ALBUM_PATHNAME,
  path: `${ALBUM_PATHNAME}/:albumId`,
  Component: Album,
};

const TRACK_ROUTE = {
  pathname: TRACK_PATHNAME,
  path: `${TRACK_PATHNAME}/:trackId`,
  Component: Track,
};

export const routes = [ALBUM_ROUTE, TRACK_ROUTE, ARTIST_ROUTE, HOME_ROUTE];
