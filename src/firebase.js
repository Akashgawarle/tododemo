import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJTQqL4ivPV7RZbmmgnLA-pYCgRamQtOo",
  authDomain: "tododemo-a980d.firebaseapp.com",
  projectId: "tododemo-a980d",
  storageBucket: "tododemo-a980d.appspot.com",
  messagingSenderId: "142373794580",
  appId: "1:142373794580:web:709f9ef5c7cabbef694801",
  measurementId: "G-6G3LZEYQ3P",
};

const isStaging = true;

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const realtimeDB = firebase.database();
const authentication = firebase.auth();

const userAuth = authentication.onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    var eid = user.providerData[0].email;

    // //To Check -> User exist in Users DB || Create new entry with UID

    const UserCreateInDB = () => {
      const userRef = db.collection("users").doc(uid);
      userRef.set({
        email: eid,
        profilePic: "",
        name: "",
        countryCode: "",
        phone: "",
      });
    };

    const UserCheckInDB = async () => {
      const userRef = db.collection("users").doc(uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        // console.log("No such document!");
        UserCreateInDB();
      } else {
        // console.log("Document data:", doc.data());
      }
    };
    UserCheckInDB();
    return { uid, eid };
  } else {
    // console.log(`User is signed out`);
    return null;
  }
});

export { db, storage, realtimeDB, authentication, userAuth, isStaging };
