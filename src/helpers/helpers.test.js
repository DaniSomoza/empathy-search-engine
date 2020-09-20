import millisToMinutes from "./millisToMinutes";

describe("Helper funcs", () => {
  it("Should transforms 1000 milliseconds into minutes (mm:ss format)", () => {
    const milliseconds = 1000;
    const label = millisToMinutes(milliseconds);

    expect(label).toEqual("0:01");
  });

  it("Should transforms 36000 milliseconds into minutes (mm:ss format)", () => {
    const milliseconds = 36000;
    const label = millisToMinutes(milliseconds);

    expect(label).toEqual("0:36");
  });

  it("Should transforms 3455030 milliseconds into minutes (mm:ss format)", () => {
    const milliseconds = 3455030;
    const label = millisToMinutes(milliseconds);

    expect(label).toEqual("57:35");
  });

  it("Should transforms 345503 milliseconds into minutes (mm:ss format)", () => {
    const milliseconds = 345503;
    const label = millisToMinutes(milliseconds);

    expect(label).toEqual("5:46");
  });
});
