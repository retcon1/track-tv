import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { addUserAndShowStash, findUserByEmail } from "./dbFunctions";

export const signUp = async (email: string, pass: string, username: string) => {
  try {
    // Creates new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );
    const user = userCredential.user;
    await addUserAndShowStash(user, email, username);
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (email: string, pass: string): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    return true;
  } catch (err) {
    console.error(err);
    alert("Invalid email or password.");
    return false;
  }
};

export const signInGoogle = async () => {
  try {
    const googleCredentials = await signInWithPopup(auth, googleProvider);
    const user = googleCredentials.user;
    const userExists = await findUserByEmail(user.email);

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

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  if (auth.currentUser && auth.currentUser.email) {
    const result = await signIn(auth.currentUser.email, currentPassword);
    if (!result) return;
    const user = auth.currentUser;

    try {
      await updatePassword(user, newPassword);
      console.log("Password updated!");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  } else {
    throw new Error(
      "No user is currently signed in or the current user does not have an email.",
    );
  }
};
