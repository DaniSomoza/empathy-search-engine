const { HttpError, HTTP_STATUS } = require("./HttpError");

describe("Http Error Tests", () => {
  it("HttpError should return the error", () => {
    const errorData = {
      status: HTTP_STATUS.BAD_REQUEST,
      data: {
        error: {
          message: "this is the error",
          extra: "this is extra info about the error",
        },
      },
    };

    const error = new HttpError(errorData);

    expect(error.getError()).toEqual({
      message: "this is the error",
      extra: "this is extra info about the error",
    });
  });
});
