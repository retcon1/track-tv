import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { addUserAndShowStash, findUserByEmail } from "./dbFunctions";

export const signUp = async (email: string, pass: string, username: string) => {
  try {
    // Creates new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    await addUserAndShowStash(user, email, username);
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
    if (!userExists) {
      await addUserAndShowStash(user);
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
};
