import * as firebase from "firebase"
require("@firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyCNq2_pMTeI09CaSqex085Yn8dthdebSxQ",
  authDomain: "booksanta-74325.firebaseapp.com",
  databaseURL: "https://booksanta-74325-default-rtdb.firebaseio.com",
  projectId: "booksanta-74325",
  storageBucket: "booksanta-74325.appspot.com",
  messagingSenderId: "737339891254",
  appId: "1:737339891254:web:560918b944153527530297"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
   export default firebase.firestore()