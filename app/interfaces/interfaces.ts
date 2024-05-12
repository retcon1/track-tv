export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface ShowStats {
  id: string;
  title: string;
  current_episode: number;
  total_episodes: number;
  status: string;
  rating: number;
  started_watching: Date | FirestoreTimestamp;
  image: string | undefined;
  url: string;
}

export function createShowStats(info: ShowBasicInfo): ShowStats {
  return {
    ...info,
    current_episode: 0,
    total_episodes: 0,
    started_watching: new Date(),
  };
}

export interface UserData {
  user_id: string;
  email: string;
  show_stash_id: string;
  username: string;
}

export interface ShowBasicInfo {
  id: string;
  title: string;
  status: string;
  rating: number;
  image: string | undefined;
  url: string;
  genres: string[];
}
