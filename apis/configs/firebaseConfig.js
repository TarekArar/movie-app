import { initializeApp } from "firebase/app";

// in real world app we should put this config in env vars to avoid security issues
const firebaseConfig = {
  apiKey: "AIzaSyD5K9T0GyqzlWtPcnW5fdo_AX4xU9QO2to",
  authDomain: "movie-app-ec43c.firebaseapp.com",
  projectId: "movie-app-ec43c",
  storageBucket: "movie-app-ec43c.appspot.com",
  messagingSenderId: "50945307826",
  appId: "1:50945307826:web:1f8dfd3f6149521c8f85ab",
  measurementId: "G-T2FMNJ7N59",
};

const app = initializeApp(firebaseConfig);

export default app;
