import Api from "../Api";
import GET_TRACK_MOCK from "../../../internals/request/getTrack";
import { getTrack } from "./tracks";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

describe("HTTP Tracks endpoint Tests", () => {
  it("Should get the track requested", async () => {
    const request = jest
      .spyOn(Api, "get")
      .mockImplementation(
        () => new Promise((resolve) => resolve(GET_TRACK_MOCK))
      );

    getTrack.mockRestore();

    const trackId = "1";
    const url = `${BASE_URL}${API_VERSION}/tracks/${trackId}`;

    const track = await getTrack(trackId);

    expect(request).toHaveBeenCalledWith(url);

    expect(track).toEqual(GET_TRACK_MOCK);
  });
});
