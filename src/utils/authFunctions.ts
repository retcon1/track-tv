import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { UserData } from "../interfaces/interfaces";
import { findUserByEmail } from "./dbFunctions";

export const signUp = async (email: string, pass: string, username: string) => {
  try {
    // Creates new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass
    );
    const user = userCredential.user;

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
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (email: string, pass: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    console.error(err);
  }
};

export const signInGoogle = async () => {
  try {
    const googleCredentials = await signInWithPopup(auth, googleProvider);
    const user = googleCredentials.user;
    const userExists = await findUserByEmail(user.email);
    console.log(userExists);
    if (user.email && !userExists) {
      // Creates new show_stash for that user
      const showStashCollectionRef = collection(db, "show_stash");
      const showStashDocRef = await addDoc(showStashCollectionRef, {
        user_id: user.uid,
      });

      // Adds new user info to users collection
      const userCollectionRef = collection(db, "users");
      const newUserData: UserData = {
        email: user.email,
        username: "username",
        user_id: user.uid,
        show_stash_id: showStashDocRef.id,
      };
      addDoc(userCollectionRef, newUserData);
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
