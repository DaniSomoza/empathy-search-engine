const SEARCH_ALBUMS_MOCK = {
  albums: {
    href: "https://url/v1/search?query=test&type=album&offset=0&limit=20",
    items: [
      {
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
        available_markets: ["AD", "AE"],
        external_urls: {
          spotify: "https://url/album/2",
        },
        href: "https://url/v1/albums/2",
        id: "2",
        images: [
          {
            height: 640,
            url: "https://url/image/ab67616d0000b273957da70fb7576aec56afb18d",
            width: 640,
          },
          {
            height: 300,
            url: "https://url/image/ab67616d00001e02957da70fb7576aec56afb18d",
            width: 300,
          },
          {
            height: 64,
            url: "https://url/image/ab67616d00004851957da70fb7576aec56afb18d",
            width: 64,
          },
        ],
        name: "Album 2",
        release_date: "2020-04-09",
        release_date_precision: "day",
        total_tracks: 30,
        type: "album",
        uri: "spotify:album:2",
      },
    ],
    limit: 20,
    next: null,
    offset: 0,
    previous: null,
    total: 1,
  },
};

export default SEARCH_ALBUMS_MOCK;
