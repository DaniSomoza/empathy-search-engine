const SEARCH_ALL_MOCK = {
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
        images: [],
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
  artists: {
    href: "https://url/v1/search?query=test&type=artist&offset=0&limit=20",
    items: [
      {
        external_urls: {
          spotify: "https://url/artist/1",
        },
        followers: {
          href: null,
          total: 15,
        },
        genres: [],
        href: "https://url/v1/artists/1",
        id: "1",
        images: [],
        name: "Artist 1",
        popularity: 34,
        type: "artist",
        uri: "spotify:artist:1",
      },
    ],
    limit: 20,
    next: null,
    offset: 0,
    previous: null,
    total: 1,
  },
  tracks: {
    href: "https://url/v1/search?query=jaja+meme&type=track&offset=0&limit=20",
    items: [
      {
        album: {
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
          images: [],
          name: "Album 1",
          release_date: "2019-08-23",
          release_date_precision: "day",
          total_tracks: 11,
          type: "album",
          uri: "spotify:album:2",
        },
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
        disc_number: 1,
        duration_ms: 88033,
        explicit: true,
        external_ids: {
          isrc: "233",
        },
        external_urls: {
          spotify: "https://url/track/3",
        },
        href: "https://url/v1/tracks/3",
        id: "3",
        is_local: false,
        name: "Track 3",
        popularity: 0,
        preview_url:
          "https://url/mp3-preview/ddac546091463616f8d2a98bbd4fdd6861d95a6a?cid=45dea66aee8e425e886468b8ce318e55",
        track_number: 10,
        type: "track",
        uri: "spotify:track:3",
      },
    ],
    limit: 20,
    next: null,
    offset: 0,
    previous: null,
    total: 1,
  },
};

export default SEARCH_ALL_MOCK;
