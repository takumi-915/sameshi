import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB1OCfEstfBozmI8v1_tipkdyf9WEwL06M",
  authDomain: "sameshi-b785e.firebaseapp.com",
  projectId: "sameshi-b785e",
  storageBucket: "sameshi-b785e.appspot.com",
  messagingSenderId: "196302844910",
  appId: "1:196302844910:web:bcf59f730e796b913394ff"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
