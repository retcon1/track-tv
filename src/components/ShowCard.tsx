import { ShowStats } from "../interfaces/interfaces";

const ShowCard = ({
  title,
  current_episode,
  total_episodes,
  status,
  rating,
  started_watching,
}: ShowStats) => {

  const formattedDate = new Date(
    started_watching.seconds * 1000
  ).toDateString();

  return (
    <div className="show-card">
      <h1>{title}</h1>
      <p>{status}</p>
      <p>Rating: {rating}</p>
      <p>
        {current_episode}/{total_episodes}
      </p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ShowCard;
