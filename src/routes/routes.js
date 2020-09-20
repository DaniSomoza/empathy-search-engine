import Home from "../pages/home/Home";
import Album from "../pages/album/Album";
import Track from "../pages/track/Track";
import Artist from "../pages/artist/Artist";

const DEFAULT_BASE_PATHNAME = "/";

const BASE_PATHNAME =
  process.env.REACT_APP_BASE_PATHNAME || DEFAULT_BASE_PATHNAME;

const HOME_PATHNAME = `${BASE_PATHNAME}`;
const ARTIST_PATHNAME = `${BASE_PATHNAME}artists`;
const ALBUM_PATHNAME = `${BASE_PATHNAME}albums`;
const TRACK_PATHNAME = `${BASE_PATHNAME}tracks`;

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

const routes = [ALBUM_ROUTE, TRACK_ROUTE, ARTIST_ROUTE, HOME_ROUTE];

export default routes;
