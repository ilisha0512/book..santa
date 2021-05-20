import * as firebase from "firebase"
require("@firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyCSKtPTkMObaMHVEq-3C5x09j-OmZ9FkYY",
    authDomain: "bartersystem-1e3d2.firebaseapp.com",
    projectId: "bartersystem-1e3d2",
    storageBucket: "bartersystem-1e3d2.appspot.com",
    messagingSenderId: "45638292292",
    appId: "1:45638292292:web:0d56e3c13f00159c81bd11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
   export default firebase.firestore()