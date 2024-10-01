import { UserType } from "./user";

export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: UserType[];
};

export type SelectionTracks = {
  items: number[];
  name: string;
  owner: number[];
  __v: number;
  _id: number;
};
