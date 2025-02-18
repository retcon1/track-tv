import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { addUserAndShowStash, findUserByEmail } from "./dbFunctions";
import { doc, updateDoc } from "firebase/firestore";

export const signUp = async (email: string, pass: string, username: string) => {
  try {
    // Creates new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );
    const user = userCredential.user;
    localStorage.setItem(
      "auth",
      JSON.stringify({
        email: user.email,
        uid: user.uid,
        username: username,
        avatar: user.photoURL,
      }),
    );

    updateProfile(user, { displayName: username });
    await addUserAndShowStash(user, email, username);
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (email: string, pass: string): Promise<boolean> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, pass);
    localStorage.setItem(
      "auth",
      JSON.stringify({
        email: user.email,
        uid: user.uid,
        username: user.displayName,
        avatar: user.photoURL,
      }),
    );
    window.location.reload();
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

    localStorage.setItem(
      "auth",
      JSON.stringify({
        email: user.email,
        uid: user.uid,
        username: user.displayName,
        avatar: user.photoURL,
      }),
    );

    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("auth");
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

export const changeUsername = async (newUsername: string) => {
  const user = auth?.currentUser;
  if (!user) return alert("No user signed in!");

  const userRef = doc(db, "users", user.uid);

  try {
    await updateDoc(userRef, { username: newUsername });
    await updateProfile(user, { displayName: newUsername });
    const authData = JSON.parse(localStorage.getItem("auth") || "");
    localStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, username: newUsername }),
    );
    return true;
  } catch (error) {
    console.error("Error updating username:", error);
    return false;
  }
};

export const changeAvatar = async (newAvatarUrl: string) => {
  const user = auth?.currentUser;
  if (!user) return alert("No user signed in!");

  try {
    await updateProfile(user, { photoURL: newAvatarUrl });
    const authData = JSON.parse(localStorage.getItem("auth") || "");
    localStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, avatar: newAvatarUrl }),
    );
    return true;
  } catch (error) {
    console.error("Error updating username:", error);
    return false;
  }
};

export const deleteAccount = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return alert("No user signed in!");

  try {
    await deleteUser(user);
    console.log("User account deleted!");
    localStorage.removeItem("auth");
    return true;
  } catch (error) {
    console.error("Error deleting user account:", error);
    return false;
  }
};
