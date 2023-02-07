import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqOgizUSx7Sx4RudGJH841N0ODjepjMl4",
  authDomain: "siosapp-335118.firebaseapp.com",
  databaseURL: "https://siosapp-335118-default-rtdb.firebaseio.com/",
  projectId: "siosapp-335118",
  storageBucket: "siosapp-335118.appspot.com",
  messagingSenderId: "519653301005",
  appId: "1:519653301005:web:0022c8a20cf01feab7ae44",
  measurementId: "G-0FQ0WFXJGT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// connectDatabaseEmulator(db, "192.168.100.189", 9000);
// connectDatabaseEmulator(db, "localhost", 9000);

const auth = getAuth();
// connectAuthEmulator(auth, "http://192.168.100.189:9099");
// connectAuthEmulator(auth, "http://localhost:9099");

const functions = getFunctions();
// connectFunctionsEmulator(functions, "192.168.100.189", 5001);
// connectFunctionsEmulator(functions, "localhost", 5001);

const storage = getStorage();
// connectStorageEmulator(storage, "192.168.100.189", 9199);
// connectStorageEmulator(storage, "localhost", 9199)

const rol = auth.onAuthStateChanged(async (user) => {
  let result = "";
  if (user) {
    result = (await user.getIdTokenResult()).claims.name;
  }
  return result;
});

export { auth, db, functions, storage, rol };
