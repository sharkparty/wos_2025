import { friendlyDateUtil } from "./friendly-date.util";

describe("friendlyDateUtil", () => {
  it("should correctly format a date with a two-digit day", () => {
    const isoDate = "2024-08-22T10:00:00.000Z";
    expect(friendlyDateUtil(isoDate)).toBe("Aug 22, 2024");
  });

  it("should correctly format a date with a single-digit day (0-padded)", () => {
    const isoDate = "2025-01-05T00:00:00.000Z";
    expect(friendlyDateUtil(isoDate)).toBe("Jan 05, 2025");
  });

  it("should handle dates in different months and years", () => {
    const isoDate = "2023-12-31T23:59:59.000Z";
    expect(friendlyDateUtil(isoDate)).toBe("Dec 31, 2023");
  });

  it("should ignore time components and produce the correct date", () => {
    const isoDate = "2026-03-15T15:30:00.000Z";
    expect(friendlyDateUtil(isoDate)).toBe("Mar 15, 2026");
  });

  it("should correctly format the first day of a month", () => {
    const isoDate = "2024-11-01T00:00:00.000Z";
    expect(friendlyDateUtil(isoDate)).toBe("Nov 01, 2024");
  });

  it('should return "Invalid Date" when provided with a garbage string', () => {
    const isoDate = "not-a-valid-date";
    expect(friendlyDateUtil(isoDate)).toBe("Invalid Date");
  });
});
