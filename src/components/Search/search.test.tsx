import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Search } from "./Search";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSearch } from "@features/filterSlice";

jest.mock("../../store/store");

const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockUseAppSelector = useAppSelector as jest.Mock;
const mockDispatch = jest.fn();

describe("Search component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  it("should render search input with correct placeholder", () => {
    mockUseAppSelector.mockReturnValue({ search: "" });

    render(<Search />);

    const input = screen.getByPlaceholderText("Поиск");
    expect(input).toBeInTheDocument();
  });

  it("should display the current search value", () => {
    const searchValue = "test";
    mockUseAppSelector.mockReturnValue({ search: searchValue });

    render(<Search />);

    const input = screen.getByPlaceholderText("Поиск");
    expect(input).toHaveValue(searchValue);
  });

  it("should dispatch setSearch action when input value changes", () => {
    mockUseAppSelector.mockReturnValue({ search: "" });

    render(<Search />);

    const input = screen.getByPlaceholderText("Поиск");
    fireEvent.change(input, { target: { value: "new search" } });

    expect(mockDispatch).toHaveBeenCalledWith(setSearch("new search"));
  });
});
