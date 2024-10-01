import { formatTime } from "./formatTime";

describe("formatTime", () => {
  it("should format time correctly", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(30)).toBe("0:30");
    expect(formatTime(60)).toBe("1:00");
    expect(formatTime(90)).toBe("1:30");
    expect(formatTime(120)).toBe("2:00");
    expect(formatTime(180)).toBe("3:00");
    expect(formatTime(360)).toBe("6:00");
  });
});
