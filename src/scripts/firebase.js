import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, set } from "firebase/database";
// import these function and variables to avoid repeating
import { createListItem, lockerReady, groupOne, groupTwo, groupThree, groupFour, groupFive, lockerNumber, roomType, messageBoard } from "./script";

// I am using Firebase to hold array data that will constantly be reset because I wasnt sure of another way
// to do this. The database holds a very small amount of data and while Firebase doesnt recommend using associative arrays,
// I think this is a rare case where it would be okay bc its not being used as a true database

const firebaseConfig = {
  apiKey: "AIzaSyDZdTnf6lQV8AAcgCnhZbbBgTdBB2JIvxo",
  authDomain: "csd-waitlist.firebaseapp.com",
  projectId: "csd-waitlist",
  databaseURL: "https://csd-waitlist-default-rtdb.firebaseio.com",
  storageBucket: "csd-waitlist.appspot.com",
  messagingSenderId: "835959686846",
  appId: "1:835959686846:web:c586727259a59ccdfb80ef"
};

initializeApp(firebaseConfig);
const dbRef = ref(getDatabase())

const clearWaitlist = document.getElementById("removeAllLockers")

clearWaitlist.addEventListener("click", (e) => {
  if(confirm('Are you sure?')) {
    set(child(dbRef, 'Waiting Lists/'), {
      "Non TV": "",
      "Regular TV": "",
      "Large TV": "",
      "Regular Suite": "",
      "Deluxe Suite": ""
    })
  } else e.preventDefault()
})

// set array for each group list so that I can iterate through and add their list items (<li/>) from firebase data
const firebaseListArray = [groupOne, groupTwo, groupThree, groupFour, groupFive]

// this function happens on page load to grab firebase data and append to DOM if available
get(child(dbRef, `Announcements/Locker Number Ready/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const lockerReadyArr = snapshot.val()
    if (lockerReadyArr !== "") {
      lockerReadyArr.map(locker => {
        localStorage.setItem("lockernumber", locker["Locker Number"])
        localStorage.setItem("listName", locker["Room"])
        lockerReady(locker)
      })
    }
  } else {
    console.log("No data available");
  }
})

// this function will happen only once upon each page load and refresh, nothing will be added if the firebase data for that specific list is empty string
firebaseListArray.map((group) => {
  let groupTitle = group.title
  get(child(dbRef, `Waiting Lists/` + `${groupTitle}/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const firebaseArray = snapshot.val()
      if (firebaseArray !== "") {
        // I have to change the values to work with the firebase data, hence overriding the values from the original script
        // regex is used to pull the number from the string and create the "lockerNumber.value"
        firebaseArray.map(fbItem => {
          createListItem(roomType.value = `${groupTitle}` , lockerNumber.value = fbItem["Locker Number"].match(/\d+/)[0])
          roomType.value = ""
        }
        )
      }
    } else {
      roomType.value = ""
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
})

// First time case for using the built in MutationObserver, I am very much a fan of this!
// I use this to check for "mutations" of both adding to a list and also editing them with the Sortable.js module
// it will then take the necesary data and reset each category/list with the locker number li item info
const config = { attributes: true, childList: true };
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList" || mutation.attributeName === "draggable") {
      const group = mutation.target.id
      const category = mutation.target.title
      const groupLiQuery = ((document.getElementById(`${group}`)).querySelectorAll('li'))
      const nodeList = Array.from(groupLiQuery, function(item) {
        // have to reset attributes for any mutations for title to work correctly
        item.setAttribute("title", category)
        item.firstChild.setAttribute("title", category)
        return {
          "Room": category,
          // replace function removes weird x symbol, not sure how that is there?
          "Locker Number": item.textContent.replace(/(×)/ig, '')
        }
      })
      const listRef = child(dbRef, `Waiting Lists/` + `${category}/`)
      const nodeArray = nodeList.map((locker) => (locker))
      if (nodeArray.length !== 0) {
        set(listRef, nodeArray)
      } else set(listRef, "")
    }
  }
};

const observer = new MutationObserver(callback);

// Start observing the target ul nodes for configured mutations
observer.observe(groupOne, config);
observer.observe(groupTwo, config);
observer.observe(groupThree, config);
observer.observe(groupFour, config);
observer.observe(groupFive, config);

const observer1 = new MutationObserver(function(mutations) {
  for (const mutation of mutations) {
    const listRef = child(dbRef, `Announcements/Locker Number Ready/`)
    
    const messageBoardQuery = messageBoard.querySelectorAll('div')
    const nodeDivList = Array.from(messageBoardQuery, function(item) {
      // return "Locker Number " + item.innerText.match(/\d+/)[0]
      return {
        "Room": item.title,
        "Locker Number": item.innerText
      }
    })
    const nodeArray = nodeDivList.map((locker) => (locker))
      if (nodeArray.length !== 0) {
        set(listRef, nodeArray)
      } else set(listRef, "")
  };
});

observer1.observe(messageBoard, config);