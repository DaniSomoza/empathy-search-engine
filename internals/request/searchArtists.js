const SEARCH_ARTISTS_MOCK = {
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
};

export default SEARCH_ARTISTS_MOCK;
