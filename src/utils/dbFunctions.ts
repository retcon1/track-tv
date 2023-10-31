import {
  query,
  where,
  getDocs,
  collection,
  doc,
  QuerySnapshot,
  DocumentData,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { ShowStats, UserData } from "../interfaces/interfaces";

// If no email is provided, the function will search for the logged in user's data
export const findUserByEmail = async (
  userEmail = auth?.currentUser?.email
): Promise<UserData | null> => {
  if (!userEmail) {
    console.log("User not signed in!");
    return null;
  }

  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", userEmail));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No user found with email ${userEmail}`);
      return null;
    }

    const userData = querySnapshot.docs[0].data() as UserData;
    userData.user_id = querySnapshot.docs[0].id;

    return userData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCurrentUserShows = async (): Promise<ShowStats[] | null> => {
  const user = await findUserByEmail();

  if (!user) {
    console.log("User not signed in!");
    return null;
  }
  try {
    const showsCollectionRef = collection(
      db,
      "show_stash",
      user.show_stash_id,
      "shows"
    );
    const showsQuerySnapshot = await getDocs(showsCollectionRef);

    const showsDataArray: ShowStats[] = [];

    showsQuerySnapshot.forEach((doc) => {
      const showData = doc.data();
      showData.id = Number(doc.id);
      showsDataArray.push(showData as ShowStats);
    });
    return showsDataArray;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateCurrEp = async (showId: string, epNum: number) => {
  const userData = await findUserByEmail();

  if (!userData) {
    console.log("No user data found.");
    return null;
  }

  const showDocRef = doc(
    db,
    "show_stash",
    userData.show_stash_id,
    "shows",
    showId.toString()
  );

  try {
    // Update the current_episode for the specified show
    await setDoc(showDocRef, { current_episode: epNum }, { merge: true });
  } catch (error) {
    console.error("Error updating current_episode:", error);
  }
};
