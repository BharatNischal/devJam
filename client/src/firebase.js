import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: 'AIzaSyA93uRu8jiVGJ5t8UPShoYZzB4_s8LyF9A',
    authDomain: "devjam-code-swat.herokuapp.com",
    databaseURL: "https://devjam-cb9e8.firebaseio.com",
    projectId: "devjam-cb9e8",
    storageBucket:"devjam-cb9e8.appspot.com",
    appId: "1:512208372593:web:71e04730b56d646270ecd0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage().ref("/images");

export  {
    storage, firebase as default
  }
 
