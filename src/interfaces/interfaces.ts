export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface ShowStats {
  title: string;
  current_episode: number;
  total_episodes: number;
  status: string;
  rating: number;
  started_watching: FirestoreTimestamp;
}
