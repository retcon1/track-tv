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

export const findUserByEmail = async (
  email: string
): Promise<UserData | null> => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No user found with email ${email}`);
      return null;
    }

    const userData = querySnapshot.docs[0].data() as UserData;

    return userData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCurrentUserShows = async (): Promise<ShowStats[] | null> => {
  const userEmail = auth?.currentUser?.email;
  if (!userEmail) {
    console.log("User not signed in!");
    return null;
  }
  const user = await findUserByEmail(userEmail);

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
  const userEmail = auth?.currentUser?.email;

  if (!userEmail) {
    console.log("No user is currently signed in.");
    return null;
  }

  const userData = await findUserByEmail(userEmail);

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
