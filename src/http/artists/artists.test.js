import Api from "../Api";
import GET_ARTIST_MOCK from "../../../internals/request/getArtist";
import { getArtist } from "./artists";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

describe("HTTP Artists endpoint Tests", () => {
  it("Should get the artists requested", async () => {
    const request = jest
      .spyOn(Api, "get")
      .mockImplementation(
        () => new Promise((resolve) => resolve(GET_ARTIST_MOCK))
      );

    getArtist.mockRestore();

    const artistId = "1";
    const url = `${BASE_URL}${API_VERSION}/artists/${artistId}`;

    const artist = await getArtist(artistId);

    expect(request).toHaveBeenCalledWith(url);

    expect(artist).toEqual(GET_ARTIST_MOCK);
  });
});
