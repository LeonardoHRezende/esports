import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAYLB5W-P7gpdx9lVCnA_LsD5iWn2ocNWY",
    authDomain: "auth-10810.firebaseapp.com",
    projectId: "auth-10810",
    storageBucket: "auth-10810.appspot.com",
    messagingSenderId: "764644916431",
    appId: "1:764644916431:web:5b23434b661365c9f08bba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
