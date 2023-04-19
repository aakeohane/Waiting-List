import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, get, child, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


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

const groupOne = document.getElementById("list1")
const groupTwo = document.getElementById("list2")
const groupThree = document.getElementById("list3")
const groupFour = document.getElementById("list4")
const groupFive = document.getElementById("list5")

// Keep this for resetting lists
set(child(dbRef, 'Waiting Lists/'), {
  "Non TV": "",
  "Regular TV": "",
  "Large TV": "",
  "Regular Suite": "",
  "Deluxe Suite": ""
})

const config = { attributes: true, childList: true };
// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {

  

  for (const mutation of mutationList) {
    if (mutation.type === "childList" || mutation.attributeName === "draggable") {
      const group = mutation.target.id
      console.log(mutation.target)
      const groupies = ((document.getElementById(`${group}`)).querySelectorAll('li'))
      // const queryList = groupOne.querySelectorAll('li')
      const nodeList = Array.from(groupies, function(item) {
        return item.textContent.replace(/(×)/ig, '')
      })
      const listRef = child(dbRef, `Waiting Lists/` + ``)

      set(listRef, nodeList.map((locker) => (locker)))


      // get(child(dbRef, `Waiting Lists/Regular Suite/`)).then((snapshot) => {
      //   if (snapshot.exists()) {
      //     // console.log(snapshot.val())
      //   } else {
      //     console.log("No data available");
      //   }
      // }).catch((error) => {
      //   console.error(error);
      // });
      
    }
  }
};
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(groupOne, config);
observer.observe(groupTwo, config);
observer.observe(groupThree, config);
observer.observe(groupFour, config);
observer.observe(groupFive, config);






