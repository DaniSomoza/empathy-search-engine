const GET_TRACK_MOCK = {
  album: {
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https:/url/artist/1",
        },
        href: "https://api.spotify.com/v1/artists/1",
        id: "1",
        name: "artist 1",
        type: "artist",
        uri: "spotify:artist:1",
      },
    ],
    available_markets: ["CA", "US"],
    external_urls: {
      spotify: "https://url/album/2",
    },
    href: "https://url/v1/albums/2",
    id: "2",
    images: [],
    name: "album 2",
    release_date: "1986-03-03",
    release_date_precision: "day",
    total_tracks: 137,
    type: "album",
    uri: "spotify:album:2",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://url/artist/1",
      },
      href: "https://api.spotify.com/v1/artists/1",
      id: "1",
      name: "Artist 1",
      type: "artist",
      uri: "spotify:artist:1",
    },
  ],
  available_markets: ["CA", "US"],
  disc_number: 1,
  duration_ms: 515386,
  explicit: false,
  external_ids: {
    isrc: "3",
  },
  external_urls: {
    spotify: "https://url/track/3",
  },
  href: "https://url/v1/tracks/3",
  id: "54bm2e3tk8cliUz3VSdCPZ",
  is_local: false,
  name: "Track 3",
  popularity: 67,
  preview_url: "https://url/mp3-preview/3?cid=3",
  track_number: 2,
  type: "track",
  uri: "spotify:track:3",
};

export default GET_TRACK_MOCK;
