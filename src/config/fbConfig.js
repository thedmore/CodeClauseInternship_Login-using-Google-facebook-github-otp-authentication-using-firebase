import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBRf3_0hsPW4YfMIuUr639CCW9QN5ZyTF8",
  authDomain: "todoapp-6bf0a.firebaseapp.com",
  databaseURL: "https://todoapp-6bf0a.firebaseio.com",
  projectId: "todoapp-6bf0a",
  storageBucket: "todoapp-6bf0a.appspot.com",
  messagingSenderId: "89252493548"
};
export const firebaseApp = firebase.initializeApp(config);


