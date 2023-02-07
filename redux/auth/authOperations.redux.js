import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  authSignOut,
  authStateChange,
  updateUserProfile,
} from "./authReducer.redux";
import { app } from "../../firebase/config";

export const auth = getAuth(app);

const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const {
        user: { uid, displayName },
      } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, { displayName: login, email });

      dispatch(updateUserProfile({ userId: uid, login: displayName }));
    } catch (e) {
      console.log("error", e);
      console.log(e.message);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (e) {
      console.log("error", e);
      console.log(e.message);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
    .then(() => {
      console.log("all ok");
    })
    .catch((e) => console.log(e));

  dispatch(authSignOut());
};

const refreshUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = user;
      dispatch(updateUserProfile({ userId: uid, login: displayName, email }));
      dispatch(authStateChange(true));
    }
  });
};

export { authSignUpUser, authSignInUser, authSignOutUser, refreshUser };
