const GET_ALBUM_MOCK = {
  album_type: "album",
  artists: [
    {
      external_urls: {
        spotify: "https://url/artist/1",
      },
      href: "https://url/v1/artists/1",
      id: "1",
      name: "Artist 1",
      type: "artist",
      uri: "spotify:artist:1",
    },
  ],
  available_markets: ["CA", "US"],
  copyrights: [],
  external_ids: {
    upc: "2",
  },
  external_urls: {
    spotify: "https://url/album/2",
  },
  genres: [],
  href: "https://url/v1/albums/2",
  id: "2",
  images: [],
  label: "Label Album",
  name: "Album 2",
  popularity: 67,
  release_date: "1986-03-03",
  release_date_precision: "day",
  total_tracks: 137,
  type: "album",
  uri: "spotify:album:2",
};

export default GET_ALBUM_MOCK;
