import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, onValue } from "firebase/database";
import { useEffect, useState } from "react";
// import { getVertexAI } from "firebase/vertexai-preview";

const firebaseConfig = {
  apiKey: "AIzaSyCDho8TGp_u5XREaD-A8xlIpnT4waUK9Ek",
  authDomain: "traxpense-6ba04.firebaseapp.com",
  projectId: "traxpense-6ba04",
  storageBucket: "traxpense-6ba04.appspot.com",
  appId: "1:754301787382:web:c4748297564e094ab820d7",
  messagingSenderId: "754301787382",
  measurementId: "G-PPGZYGH2WP",
  databaseURL:
    "https://traxpense-6ba04-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getDatabase(app);
export function useDatabaseData(dbref) {
  const [databaseData, setDatabaseData] = useState({});

  useEffect(() => {
    const unsubscribe = onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      setDatabaseData(data);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return databaseData;
}
// export const vertexAI = getVertexAI(app);