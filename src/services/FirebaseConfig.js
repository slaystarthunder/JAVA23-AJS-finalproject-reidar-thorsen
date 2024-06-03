import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCLEgYj5CsWHjETLVpSQeLEMox-YOS36IM",
  authDomain: "scrum-board-ae496.firebaseapp.com",
  databaseURL: "https://scrum-board-ae496-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrum-board-ae496",
  storageBucket: "scrum-board-ae496.appspot.com",
  messagingSenderId: "852401395418",
  appId: "1:852401395418:web:d102cf945c29bf071cf7e3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
