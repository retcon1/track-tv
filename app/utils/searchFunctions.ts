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
    network: showData.network?.name || showData.webChannel?.name || "Unknown",
    cast: cast,
    inLibrary: inLibrary,
    total_episodes: 0,
  };
};

const extractCastInfo = (castArray: any) => {
  return castArray.map((cast: any) => {
    return {
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
