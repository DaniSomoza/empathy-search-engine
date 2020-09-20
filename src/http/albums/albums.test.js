import Api from "../Api";
import { getAlbum } from "./albums";
import GET_ALBUM_MOCK from "../../../internals/request/getAlbum";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

describe("HTTP Albums endpoint Tests", () => {
  it("Should get the album requested", async () => {
    const request = jest
      .spyOn(Api, "get")
      .mockImplementation(
        () => new Promise((resolve) => resolve(GET_ALBUM_MOCK))
      );

    getAlbum.mockRestore();

    const albumId = "1";
    const url = `${BASE_URL}${API_VERSION}/albums/${albumId}`;

    const album = await getAlbum(albumId);

    expect(request).toHaveBeenCalledWith(url);

    expect(album).toEqual(GET_ALBUM_MOCK);
  });
});
