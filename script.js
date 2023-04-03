const groupOne = document.getElementById("list1")
const groupTwo = document.getElementById("list2")
const groupThree = document.getElementById("list3")
const groupFour = document.getElementById("list4")

const lockerNumber = document.getElementById("locker")
const roomType = document.getElementById("roomType")

const button = document.getElementById("button")

// const config = {
//   childList: true
// }

// // Callback function to execute when mutations are observed
// const callback = (mutationList, observer) => {
//   for (const mutation of mutationList) {
//     if (mutation.type === "childList") {
//       console.log("A child node has been added or removed.");
//     } else if (mutation.type === "attributes") {
//       console.log(`The ${mutation.attributeName} attribute was modified.`);
//     }
//   }
// };

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback);

// // Start observing the target node for configured mutations
// observer.observe(groupOne, config);

const listOne = [
]

const listTwo = [
]

const listThree = [
]

const listFour = [
]

button.addEventListener('click', () => {
  const newElement = document.createElement('div')
  newElement.innerText = lockerNumber.value
  newElement.className = "listItems"
  let list
  switch(roomType.value) {
    case "basic":
      list = groupTwo
      break;
    case "suite":
      list = groupThree
      break;
    case "lux":
      list = groupFour
      break;
    default:
      list = groupOne
  }
  list.appendChild(newElement)
});


// function makeList(location, list) {
//   list.forEach((item) => {
//     let div = document.createElement("div");
//     div.innerText = item
//     div.className = "listItems"
//     location.appendChild(div)
//   })
// }

// makeList(groupOne, listOne)
// makeList(groupTwo, listTwo)
// makeList(groupThree, listThree)
// makeList(groupFour, listFour)