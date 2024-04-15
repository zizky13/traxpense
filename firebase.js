// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDho8TGp_u5XREaD-A8xlIpnT4waUK9Ek",
  authDomain: "traxpense-6ba04.firebaseapp.com",
  projectId: "traxpense-6ba04",
  storageBucket: "traxpense-6ba04.appspot.com",
  messagingSenderId: "754301787382",
  appId: "1:754301787382:web:c4748297564e094ab820d7",
  measurementId: "G-PPGZYGH2WP",
  databaseURL:
    "https://traxpense-6ba04-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getDatabase(app);
