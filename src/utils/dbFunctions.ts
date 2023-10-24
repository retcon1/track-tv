import {
  query,
  where,
  getDocs,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const findUserByEmail = async (email: string) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const userId = doc.id;

        console.log(`User with email ${email}:`, userData.show_stash_id);
        console.log(`User ID:`, userId);
      });
    } else {
      console.log(`No user found with email ${email}`);
    }
  } catch (err) {
    console.error(err);
  }
};

export const findUserShowStashId = async (email: string) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const userData = doc.data();
      const showStashId = userData.show_stash_id;

      return showStashId;
    } else {
      console.log(`No user found with email ${email}`);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCurrentUserShows = async () => {
  try {
    const userEmail = auth?.currentUser?.email;

    if (!userEmail) {
      console.log("No user is currently signed in.");
      return null;
    }

    const stashId = await findUserShowStashId(userEmail);

    if (!stashId) {
      console.log("No show stash ID found for the user.");
      return null;
    }

    const showCollectionRef = doc(db, "show_stash", stashId);
    const docSnap = await getDoc(showCollectionRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const userShows = userData.shows;
      console.log("User's shows:", userShows);
      return userShows;
    } else {
      console.log("Show stash document does not exist.");
      return null;
    }
  } catch (err) {
    console.error("Error while fetching user shows:", err);
    return null;
  }
};
