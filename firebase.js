import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, get, child, set, push } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZdTnf6lQV8AAcgCnhZbbBgTdBB2JIvxo",
  authDomain: "csd-waitlist.firebaseapp.com",
  projectId: "csd-waitlist",
  databaseURL: "https://csd-waitlist-default-rtdb.firebaseio.com",
  storageBucket: "csd-waitlist.appspot.com",
  messagingSenderId: "835959686846",
  appId: "1:835959686846:web:c586727259a59ccdfb80ef"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const dbRef = ref(getDatabase())

// Keep this for resetting lists
// set(child(dbRef, 'Waiting Lists/'), {
//   "Non TV": '',
//   "Regular TV": '',
//   "Large TV": '',
//   "Regular Suite": '',
//   "Deluxe Suite": ''
// })

get(child(dbRef, `Waiting Lists/`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

// const listRef = child(dbRef, `Waiting Lists/Regular Suite/`)
// const newLocker = push(listRef)
// set(newLocker, {
//   "locker 1": ""
// })


