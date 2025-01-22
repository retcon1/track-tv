import axios from "axios";
import {
  CastDetails,
  CastShowInfo,
  ShowBasicInfo,
  ShowDetailedInfo,
} from "../interfaces/interfaces";
import { checkShowInUserLibrary, getCurrentUserShows } from "./dbFunctions";
import { Timestamp } from "firebase/firestore";

const SHOW_SEARCH_URL = "https://api.tvmaze.com/search/shows?q=";

export const searchShow = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${SHOW_SEARCH_URL}${searchTerm}`);

    // Fetches user shows in order to see whether they exist in the library
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

export const getNumberOfEpisodes = async (showId: string) => {
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
    const inLibrary = await checkShowInUserLibrary(showId);
    const showData = extractDetailedShowInfo(response.data, inLibrary);
    const episodes = await getNumberOfEpisodes(showId);
    showData.total_episodes = episodes;

    return showData;
  } catch (err) {
    console.error(err);
  }
};

const extractDetailedShowInfo = (
  showData: any,
  inLibrary: boolean,
): ShowDetailedInfo => {
  const cast = extractCastInfo(showData._embedded.cast);

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
    network: showData.network?.name || showData.webChannel?.name || "Unknown",
    cast: cast,
    inLibrary: inLibrary,
    total_episodes: 0,
  };
};

const extractCastInfo = (castArray: any) => {
  return castArray.map((cast: any) => {
    return {
      id: cast.person.id,
      castName: cast.person.name,
      charName: cast.character.name,
      headshot: cast.person.image?.medium,
      charHeadshot: cast.character.image?.medium,
    };
  });
};

export const fetchShowBanner = async (showId: string) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${showId}/images`,
    );
    const images = response.data;
    let banner = images.find((image: any) => image.type === "banner");
    if (!banner)
      banner = images.find((image: any) => image.type === "background");

    if (!banner) return null;
    return banner.resolutions.original.url;
  } catch (err) {
    console.error(err);
  }
};

export const getCastDetails = async (castId: string) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com/people/${castId}`);
    return extractCastInfoDetailed(response.data);
  } catch (err) {
    console.error(err);
  }
};

const extractCastInfoDetailed = (cast: any): CastDetails => {
  return {
    id: cast.id,
    name: cast.name,
    country: cast.country.name,
    birthday: cast.birthday,
    age: calculateAge(cast.birthday),
    deathday: cast.deathday,
    headshot: cast.image.medium,
    gender: cast.gender,
  };
};

const calculateAge = (birthdate: string): number | null => {
  if (!birthdate) return null;
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const getCastShows = async (
  castId: string,
): Promise<CastShowInfo[] | undefined> => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/people/${castId}/castcredits`,
    );
    const castShows = await extractCastShows(response.data);

    const detailedShows: CastShowInfo[] = [];

    await Promise.all(
      castShows.map(async (show: any) => {
        const details = await getCastShowDetails(show.url);
        const existingShow = detailedShows.find((s) => s.id === details?.id);

        if (existingShow) {
          existingShow.charName.push(show.charName);
        } else {
          detailedShows.push({ ...details!, charName: [show.charName] });
        }
      }),
    );

    return detailedShows;
  } catch (err) {
    console.error(err);
  }
};

// Used on cast pages to display what shows they've been in
export const getCastShowDetails = async (showUrl: string) => {
  try {
    const response = await axios.get(showUrl);
    const showData = response.data;

    const result = {
      id: showData.id,
      title: showData.name,
      rating: showData.rating.average,
      image: showData.image?.medium,
    };

    return result;
  } catch (err) {
    console.error(err);
  }
};

const extractCastShows = async (data: any) => {
  return data.map((show: any) => ({
    url: show._links.show.href,
    charName: show._links.character.name,
  }));
};
