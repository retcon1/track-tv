import { collection, getDocs, setDoc } from "firebase/firestore";
import { findUserById } from "./dbFunctions";
import { db } from "../config/firebase";
import { getNumberOfEpisodes } from "./searchFunctions";

export const updateShows = async () => {
  const user = await findUserById();

  if (!user) {
    console.log("User not signed in!");
    return;
  }

  try {
    const showsCollectionRef = collection(
      db,
      "show_stash",
      user.show_stash_id,
      "shows",
    );
    const showsQuerySnapshot = await getDocs(showsCollectionRef);

    const updatedShows: String[] = [];

    const updatePromises = showsQuerySnapshot.docs.map(async (doc) => {
      const showData = doc.data();
      const episodes = await getNumberOfEpisodes(showData.id);
      if (episodes > showData.total_episodes) {
        updatedShows.push(showData.title);
        const docRef = doc.ref;
        if (showData.status === "completed") {
          await setDoc(
            docRef,
            { status: "paused", total_episodes: episodes },
            { merge: true },
          );
        } else {
          await setDoc(docRef, { total_episodes: episodes }, { merge: true });
        }
      }
    });

    await Promise.all(updatePromises); // Wait for all updates to complete

    return updatedShows;
  } catch (err) {
    console.error(err);
    return null;
  }
};
