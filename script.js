const groupOne = document.getElementById("list1")
const groupTwo = document.getElementById("list2")
const groupThree = document.getElementById("list3")
const groupFour = document.getElementById("list4")
const groupFive = document.getElementById("list5")


const allGroups = document.getElementsByClassName("roomList")
const add = document.getElementById("add")
const minus = document.getElementById("minus")

const lockerNumber = document.getElementById("locker")

const roomType = document.getElementById("roomType")

const waitlistButton = document.getElementById("addToWaitlist")

add.addEventListener("click", () => {
  lockerNumber.value++
});

minus.addEventListener("click", () => {
  lockerNumber.value == 1 ? lockerNumber.value == 1 : lockerNumber.value--;
});

waitlistButton.addEventListener('click', () => {
  createListItem()
});

export default function createListItem() {
  event.preventDefault();
  const newElement = document.createElement('li')
  newElement.className = "listItems"

  const lockerNumberText = document.createElement('div')
  lockerNumberText.innerText = "Locker Number " + lockerNumber.value
  lockerNumberText.setAttribute('class', 'locker-text')
  newElement.appendChild(lockerNumberText)

  const deleteIcon = document.createElement('span');
  deleteIcon.innerHTML = "&times;"
  deleteIcon.setAttribute('class', 'remove-icon');
  setRoom(newElement, deleteIcon)
}

function setRoom(newElement, deleteIcon) {
  let list
  switch(roomType.value) {
    case "Non TV":
      list = groupOne
      break;
    case "Regular TV":
      list = groupTwo
      break;
    case "Large TV":
      list = groupThree
      break;
    case "Regular Suite":
      list = groupFour
      break;
    case "Deluxe Suite":
      list = groupFive
      break;
    default:
      list = "all"
  }
  deleteIcon.addEventListener("click", function(e) {
    removeLocker(e)
  }, false)
  newElement.appendChild(deleteIcon)
  // adds locker to each list instead of just one list
  if (list === "all") {
    Array.from(allGroups).forEach(element => {
      element.appendChild(newElement.cloneNode(true))
    })
    const clonedGroup = document.querySelectorAll(".remove-icon")
    // I have to delegate event listener individually because cloning nodes does not bring event listeners with it
    for (const clone of clonedGroup) {
      clone.addEventListener("click", removeLocker)
    }
  } else 
  // adds locker to individual list
  list.appendChild(newElement)
}

function removeLocker(e) {
  const xButton = e.target;
  const locker = xButton.parentNode;
  const lockerList = locker.parentNode;
  lockerList.removeChild(locker);
} 