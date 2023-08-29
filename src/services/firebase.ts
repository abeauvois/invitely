import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDo5AOd-xCOFjOZBaRgVwhGezTm4Ow450s",
    authDomain: "invitely-d9420.firebaseapp.com",
    databaseURL: "https://invitely-d9420-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "invitely-d9420",
    storageBucket: "invitely-d9420.appspot.com",
    messagingSenderId: "646681745567",
    appId: "1:646681745567:web:097070329b881386f46aaa"
};

export const app = initializeApp(firebaseConfig);