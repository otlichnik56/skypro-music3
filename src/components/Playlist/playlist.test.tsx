import { render, screen } from "@testing-library/react";
import { Playlist } from "./Playlist";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { TrackType } from "@models/track";
import "@testing-library/jest-dom";

jest.mock("../../store/store", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

const mockUseAppSelector = useAppSelector as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;

describe("Playlist component", () => {
  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(jest.fn());

    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        playlist: {
          likedTracks: [],
          isLoading: false,
        },
        user: {
          tokens: null,
          user: null,
        },
      })
    );
  });

  it("should render tracks when isLoading is false", () => {
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

    render(<Playlist tracks={tracks} />);

    expect(screen.getByText("Track 1")).toBeInTheDocument();
  });
});
