import { Timestamp } from "firebase/firestore";

export interface UserShowStats {
  id: string;
  title: string;
  current_episode: number;
  total_episodes: number;
  status: string;
  rating: number | null;
  started_watching: Timestamp;
  image: string | undefined;
  url: string;
  inLibrary: boolean;
}

export interface UserData {
  user_id: string;
  email: string;
  show_stash_id: string;
  username: string;
  avatar: string;
}

export interface ShowBasicInfo {
  id: string;
  title: string;
  rating: number | null;
  image: string | undefined;
  url: string;
  genres: string[];
  inLibrary: boolean | undefined;
}

export interface Actor {
  castName: string;
  charName: string;
  headshot: string;
  charHeadshot: string;
}

export interface ShowDetailedInfo {
  id: string;
  title: string;
  rating: number | null;
  image: string | undefined;
  url: string;
  genres: string[];
  inLibrary: boolean | undefined;
  cast: Actor[];
  summary: string;
  status: string;
  runtime: number;
  // premiered: string;
  network: string;
  total_episodes: number;
}
