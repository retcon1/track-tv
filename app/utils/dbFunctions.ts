import {
  query,
  where,
  getDocs,
  collection,
  doc,
  QuerySnapshot,
  DocumentData,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { ShowStats, UserData } from "../interfaces/interfaces";
import { User } from "firebase/auth";

// If no email is provided, the function will search for the logged in user's data
export const findUserByEmail = async (
  userEmail = auth?.currentUser?.email,
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
      "shows",
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

export const addUserAndShowStash = async (
  user: User,
  email: string = user.email!,
  username = "username",
) => {
  // Creates new show_stash for that user
  const showStashCollectionRef = collection(db, "show_stash");
  const showStashDocRef = await addDoc(showStashCollectionRef, {
    user_id: user.uid,
  });

  // Adds new user info to users collection
  const userCollectionRef = collection(db, "users");
  const newUserData: UserData = {
    email: email,
    username: username,
    user_id: user.uid,
    show_stash_id: showStashDocRef.id,
  };
  addDoc(userCollectionRef, newUserData);
};

const findShowStashId = async () => {
  const userData = await findUserByEmail();

  if (!userData) {
    console.log("User not signed in!");
    return null;
  }

  return userData.show_stash_id;
};

const findShowDocRef = async (showId: string) => {
  const showStashId = await findShowStashId();

  if (!showStashId) {
    console.log("Show stash not found!");
    return null;
  }

  const showStashCollectionRef = collection(
    db,
    "show_stash",
    showStashId,
    "shows",
  );
  const showDocRef = doc(showStashCollectionRef, showId.toString());

  return showDocRef;
};

export const addShowToStash = async (showData: ShowStats) => {
  const showDocRef = await findShowDocRef(showData.id.toString());
  if (!showDocRef) throw Error("Show not found!");

  try {
    await setDoc(showDocRef, showData);
  } catch (error) {
    throw console.error("Error adding show to stash:", error);
  }
};

export const removeShowFromStash = async (showId: string) => {
  const showDocRef = await findShowDocRef(showId);
  if (!showDocRef) throw Error("Show not found!");

  try {
    await deleteDoc(showDocRef);
  } catch (error) {
    console.error("Error removing show from stash:", error);
  }
};

export const updateCurrEp = async (showId: string, epNum: number) => {
  const showDocRef = await findShowDocRef(showId);
  if (!showDocRef) throw Error("Show not found!");

  try {
    // Update the current_episode for the specified show
    await setDoc(showDocRef, { current_episode: epNum }, { merge: true });
  } catch (error) {
    console.error("Error updating current_episode:", error);
  }
};
