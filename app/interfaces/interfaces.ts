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
  started_watching: FirestoreTimestamp;
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

const obj ={
  "id": 385,
  "url": "https://www.tvmaze.com/shows/385/mad-men",
  "name": "Mad Men",
  "type": "Scripted",
  "language": "English",
  "genres": [
      "Drama"
  ],
  "status": "Ended",
  "runtime": 60,
  "averageRuntime": 60,
  "premiered": "2007-07-19",
  "ended": "2015-05-17",
  "officialSite": "http://www.amc.com/shows/mad-men",
  "schedule": {
      "time": "22:00",
      "days": [
          "Sunday"
      ]
  },
  "rating": {
      "average": 8.2
  },
  "weight": 95,
  "network": {
      "id": 20,
      "name": "AMC",
      "country": {
          "name": "United States",
          "code": "US",
          "timezone": "America/New_York"
      },
      "officialSite": null
  },
  "webChannel": null,
  "dvdCountry": null,
  "externals": {
      "tvrage": 16356,
      "thetvdb": 80337,
      "imdb": "tt0804503"
  },
  "image": {
      "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/2/5589.jpg",
      "original": "https://static.tvmaze.com/uploads/images/original_untouched/2/5589.jpg"
  },
  "summary": "<p>The series revolves around the conflicted world of Don Draper, the biggest ad man in the business, and his colleagues at the Sterling Cooper Draper Pryce Advertising Agency. As Don makes the plays in the boardroom and the bedroom, he struggles to stay a step ahead of the rapidly changing times and the young executives nipping at his heels. The series also depicts authentically the roles of men and women in this era while exploring the true human nature beneath the guise of 1960s traditional family values.</p>",
  "updated": 1708454607,
  "_links": {
      "self": {
          "href": "https://api.tvmaze.com/shows/385"
      },
      "previousepisode": {
          "href": "https://api.tvmaze.com/episodes/154713",
          "name": "Person to Person"
      }
  }
}