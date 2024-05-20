import axios from "axios";
import { ShowBasicInfo } from "../interfaces/interfaces";
import { getCurrentUserShows } from "./dbFunctions";
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

export const createShowStats = async (info: ShowBasicInfo) => {
  const numberOfEpisodes = await getNumberOfEpisodes(info.id);

  return {
    ...info,
    rating: null,
    inLibrary: true,
    current_episode: 0,
    total_episodes: numberOfEpisodes,
    started_watching: Timestamp.now(),
    status: "Watching",
  };
};
