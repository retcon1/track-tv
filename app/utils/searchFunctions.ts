import axios from "axios";
import { ShowBasicInfo, ShowDetailedInfo } from "../interfaces/interfaces";
import { checkShowInUserLibrary, getCurrentUserShows } from "./dbFunctions";
import { Timestamp } from "firebase/firestore";

const SHOW_SEARCH_URL = "https://api.tvmaze.com/search/shows?q=";

export const searchShow = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${SHOW_SEARCH_URL}${searchTerm}`);
    const userShows = await getCurrentUserShows();
    const userShowIds = userShows?.map((show) => show.id);
    const showData = extractBasicShowInfo(response.data, userShowIds);
    return showData;
  } catch (err) {
    console.error(err);
  }
};

const extractBasicShowInfo = (
  showData: any[],
  userShowIds: any[] | undefined,
) => {
  const showInfo = showData.map((show: any) => {
    show = show.show;
    return {
      id: show.id,
      title: show.name,
      rating: show.rating.average,
      image: show.image?.medium,
      url: show.url,
      genres: show.genres,
      inLibrary: userShowIds?.includes(show.id),
    };
  });
  return showInfo;
};

const getNumberOfEpisodes = async (showId: string) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${showId}/episodes`,
    );
    return response.data.length;
  } catch (err) {
    console.error(err);
  }
};

export const createShowStats = async (info: ShowBasicInfo, status: string) => {
  const numberOfEpisodes = await getNumberOfEpisodes(info.id);

  return {
    ...info,
    rating: null,
    inLibrary: true,
    current_episode: status == "completed" ? numberOfEpisodes : 0,
    total_episodes: numberOfEpisodes,
    started_watching: Timestamp.now(),
    status: status,
  };
};

export const getShowDetails = async (showId: string) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${showId}?embed=cast`,
    );
    // TODO - refactor this so that it doesn't need to make this call again

    const inLibrary = await checkShowInUserLibrary(showId);
    const showData = extractDetailedShowInfo(response.data, inLibrary);
    console.log(inLibrary)
    return showData;
  } catch (err) {
    console.error(err);
  }
};

const extractDetailedShowInfo = (showData: any, inLibrary: boolean): ShowDetailedInfo => {
  const cast = extractCastInfo(showData._embedded.cast);
  console.log(showData);

  return {
    id: showData.id,
    title: showData.name,
    rating: showData.rating.average,
    image: showData.image?.medium,
    url: showData.url,
    genres: showData.genres,
    summary: showData.summary,
    status: showData.status,
    runtime: showData.averageRuntime,
    // schedule: showData.schedule,
    // premiered: showData.premiered,
    network: showData.network.name,
    cast: cast,
    inLibrary: inLibrary,
  };
};

const extractCastInfo = (castArray: any) => {
  return castArray.map((cast: any) => {
    return {
      castName: cast.person.name,
      charName: cast.character.name,
      headshot: cast.person.image?.medium,
    };
  });
};

const cast = {
  person: {
    id: 26406,
    url: "https://www.tvmaze.com/people/26406/matthew-fox",
    name: "Matthew Fox",
    country: {
      name: "United States",
      code: "US",
      timezone: "America/New_York",
    },
    birthday: "1966-07-14",
    deathday: null,
    gender: "Male",
    image: {
      medium:
        "https://static.tvmaze.com/uploads/images/medium_portrait/490/1227294.jpg",
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/490/1227294.jpg",
    },
    updated: 1701804629,
    _links: {
      self: {
        href: "https://api.tvmaze.com/people/26406",
      },
    },
  },
  character: {
    id: 34808,
    url: "https://www.tvmaze.com/characters/34808/lost-dr-jack-shephard",
    name: "Dr. Jack Shephard",
    image: {
      medium:
        "https://static.tvmaze.com/uploads/images/medium_portrait/0/1390.jpg",
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/0/1390.jpg",
    },
    _links: {
      self: {
        href: "https://api.tvmaze.com/characters/34808",
      },
    },
  },
  self: false,
  voice: false,
};
