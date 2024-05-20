import axios from "axios";
import { ShowBasicInfo } from "../interfaces/interfaces";

const SHOW_SEARCH_URL = "https://api.tvmaze.com/search/shows?q=";

export const searchShow = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${SHOW_SEARCH_URL}${searchTerm}`);
    const showData = extractBasicShowInfo(response.data);
    return showData;
  } catch (err) {
    console.error(err);
  }
};

const extractBasicShowInfo = (showData: any) => {
  const showInfo = showData.map((show: any) => {
    show = show.show;
    return {
      id: show.id,
      title: show.name,
      status: show.status,
      rating: show.rating.average,
      image: show.image?.medium,
      url: show.url,
      genres: show.genres,
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

export const createShowStats = async (info: ShowBasicInfo) => {
  const numberOfEpisodes = await getNumberOfEpisodes(info.id);

  return {
    ...info,
    current_episode: 0,
    total_episodes: numberOfEpisodes,
    started_watching: new Date(),
  };
};
