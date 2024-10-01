import {
  fetchFavoriteTracks,
  fetchSelectionTracks,
  getTracks,
} from "@api/tracksApi";
import { SelectionTracks, TrackType } from "@models/track";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getAllTracks = createAsyncThunk(
  "tracks/getAllTracks",
  async () => {
    const response = await getTracks();
    return response;
  }
);

export const getFavoriteTracks = createAsyncThunk(
  "tracks/getFavorite",
  async (token: string) => {
    const response = await fetchFavoriteTracks(token);

    return response;
  }
);

export const getSelectionTracks = createAsyncThunk(
  "tracks/getSelection",
  async (id: string): Promise<SelectionTracks> => {
    const response = await fetchSelectionTracks(id);

    return response;
  }
);

type PlaylistStateType = {
  allTracks: TrackType[];
  selectionTracks: TrackType[];
  selectionName: string;
  currentTrack: TrackType | null;
  initialPlaylist: TrackType[];
  playlist: TrackType[];
  isPlaying: boolean;
  isShuffle: boolean;
  isLoop: boolean;
  likedTracks: TrackType[];
  isLoading: boolean;
  error: string | null;
};
const initialState: PlaylistStateType = {
  allTracks: [],
  selectionTracks: [],
  selectionName: "",
  currentTrack: null,
  initialPlaylist: [],
  playlist: [],
  isPlaying: false,
  isShuffle: false,
  isLoop: false,
  likedTracks: [],
  isLoading: true,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ currentTrack: TrackType; playlist: TrackType[] }>
    ) => {
      state.currentTrack = action.payload.currentTrack;
      state.initialPlaylist = action.payload.playlist;
      state.playlist = action.payload.playlist;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? [...state.initialPlaylist].sort(() => Math.random() - 0.5)
        : state.initialPlaylist;
      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      if (playlist.length - 1 === currentIndex) {
        state.isPlaying = false;
        return;
      }
      state.currentTrack = playlist[currentIndex + 1];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? [...state.initialPlaylist].sort(() => Math.random() - 0.5)
        : state.initialPlaylist;
      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      if (!currentIndex) {
        state.isPlaying = false;
        return;
      }
      state.currentTrack = playlist[currentIndex - 1];
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.playlist = [...state.initialPlaylist].sort(
        () => Math.random() - 0.5
      );
      state.isShuffle = action.payload;
    },
    setIsLoop: (state, action: PayloadAction<boolean>) => {
      state.isLoop = action.payload;
    },
    setLike: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks.push(action.payload);
    },
    setDislike: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks = state.likedTracks.filter(
        (track) => track._id !== action.payload._id
      );
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteTracks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFavoriteTracks.fulfilled, (state, action) => {
        state.likedTracks = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavoriteTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка загрузки любимых треков";
      })
      .addCase(getAllTracks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTracks.fulfilled, (state, action) => {
        state.allTracks = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка загрузки треков";
      })
      .addCase(getSelectionTracks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getSelectionTracks.fulfilled,
        (state, action: PayloadAction<SelectionTracks>) => {
          state.selectionTracks = state.allTracks.filter((track) =>
            action.payload.items.includes(track._id)
          );
          state.selectionName = action.payload.name;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getSelectionTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка загрузки подборки";
      });
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
  setIsPlaying,
  setIsShuffle,
  setDislike,
  setLike,
  setIsLoop,
  setIsLoading,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
