import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterStateType = {
  search: string;
  authors: string[];
  genres: string[];
  dateOrder: string;
};

const initialState: FilterStateType = {
  search: "",
  authors: [],
  genres: [],
  dateOrder: "По умолчанию",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.authors.includes(author)) {
        state.authors = state.authors.filter((a) => a !== author);
      } else {
        state.authors.push(author);
      }
    },
    setGenre: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if (state.genres.includes(genre)) {
        state.genres = state.genres.filter((g) => g !== genre);
      } else {
        state.genres.push(genre);
      }
    },
    setDateOrder: (state, action: PayloadAction<string>) => {
      state.dateOrder = action.payload;
    },
    resetFilter: (state) => {
      state.search = "";
      state.authors = [];
      state.genres = [];
      state.dateOrder = "По умолчанию";
    },
  },
});

export const { setSearch, setAuthor, setGenre, setDateOrder, resetFilter } =
  filterSlice.actions;
export const filterReducer = filterSlice.reducer;
