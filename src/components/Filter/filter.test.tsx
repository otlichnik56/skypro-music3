import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAuthor, setDateOrder, setGenre } from "@features/filterSlice";
import { Filter } from "./Filter";

jest.mock("../../store/store");
jest.mock("../../store/features/filterSlice", () => ({
  setAuthor: jest.fn(),
  setDateOrder: jest.fn(),
  setGenre: jest.fn(),
}));

const mockUseAppSelector = useAppSelector as jest.Mock;
const mockUseAppDispatch = useAppDispatch as jest.Mock;

describe("Filter component", () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    mockUseAppDispatch.mockReturnValue(dispatchMock);
    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        playlist: {
          allTracks: [
            { author: "Author 1", genre: "Genre 1" },
            { author: "Author 2", genre: "Genre 2" },
          ],
          isLoading: false,
        },
        filters: {
          authors: ["Author 1"],
          genres: ["Genre 1"],
          dateOrder: "По умолчанию",
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render filter titles correctly", () => {
    render(<Filter />);
    expect(screen.getByText("Искать по:")).toBeInTheDocument();
    expect(screen.getByText("исполнителю")).toBeInTheDocument();
    expect(screen.getByText("году выпуска")).toBeInTheDocument();
    expect(screen.getByText("жанру")).toBeInTheDocument();
  });

  it("should switch active filter correctly", () => {
    render(<Filter />);
    const authorFilter = screen.getByText("исполнителю");
    fireEvent.click(authorFilter);
    expect(authorFilter).toHaveClass("active");
  });

  it("should call dispatch with setAuthor when an author is selected", () => {
    render(<Filter />);
    fireEvent.click(screen.getByText("исполнителю"));
    fireEvent.click(screen.getByText("Author 1"));
    expect(dispatchMock).toHaveBeenCalledWith(setAuthor("Author 1"));
  });

  it("should call dispatch with setGenre when a genre is selected", () => {
    render(<Filter />);
    fireEvent.click(screen.getByText("жанру"));
    fireEvent.click(screen.getByText("Genre 1"));
    expect(dispatchMock).toHaveBeenCalledWith(setGenre("Genre 1"));
  });

  it("should call dispatch with setDateOrder when a date order is selected", () => {
    render(<Filter />);
    fireEvent.click(screen.getByText("году выпуска"));
    fireEvent.click(screen.getByText("Сначала новые"));
    expect(dispatchMock).toHaveBeenCalledWith(setDateOrder("Сначала новые"));
  });

  it("should display the correct selected count", () => {
    render(<Filter />);
    const authorFilter = screen.getByText("исполнителю");
    expect(authorFilter.textContent).toContain("1");
    const genreFilter = screen.getByText("жанру");
    expect(genreFilter.textContent).toContain("1");
  });
});
