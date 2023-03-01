import app from "./configs/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const firebaseAPI = {
  loginUser: function (email, password) {
    signInWithEmailAndPassword(auth, email, password);
  },
  createAccount: function (email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  },
};
