import { filterReducer } from "@features/filterSlice";
import { playlistReducer } from "@features/tracksSlice";
import { userReducer } from "@features/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      playlist: playlistReducer,
      user: userReducer,
      filters: filterReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
