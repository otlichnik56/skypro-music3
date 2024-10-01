import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MainCenterblock } from "./MainCenterblock";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TrackType } from "@models/track";

jest.mock("../../store/store", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe("MainCenterblock component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  it("should render playlist content when isLoading is false and tracks are present", () => {
    const tracks: TrackType[] = [
      {
        _id: 1,
        name: "Track 1",
        author: "Author 1",
        album: "Album 1",
        release_date: "2023-01-01",
        genre: ["Rock"],
        duration_in_seconds: 180,
        logo: null,
        track_file: "track1.mp3",
        stared_user: [],
      },
    ];

    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        playlist: {
          isLoading: false,
          likedTracks: [],
        },
        filters: {
          authors: [],
          genres: [],
          dateOrder: "",
        },
        user: {
          tokens: null,
          user: null,
        },
      })
    );

    render(<MainCenterblock tracks={tracks} title="Test Title" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Track 1")).toBeInTheDocument();
  });

  it("should render 'Треки не найдены' when isLoading is false and no tracks are present", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        playlist: {
          isLoading: false,
          likedTracks: [],
        },
        filters: {
          authors: [],
          genres: [],
          dateOrder: "",
        },
        user: {
          tokens: null,
          user: null,
        },
      })
    );

    render(<MainCenterblock tracks={[]} title="Test Title" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Треки не найдены")).toBeInTheDocument();
  });
});
