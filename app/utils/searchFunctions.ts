import axios from "axios";

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
