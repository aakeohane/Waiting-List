import '../styles.css'

export const groupOne = document.getElementById("list1")
export const groupTwo = document.getElementById("list2")
export const groupThree = document.getElementById("list3")
export const groupFour = document.getElementById("list4")
export const groupFive = document.getElementById("list5")

const allGroups = document.getElementsByClassName("roomList")
const add = document.getElementById("add")
const minus = document.getElementById("minus")

export const lockerNumber = document.getElementById("locker")

export const roomType = document.getElementById("roomType")

const roomOptions = document.querySelectorAll(".room-options")
const checkBox = document.getElementById("checkBox")

const popup = document.getElementById("popup-menu")
const deleteAllBtn = document.getElementById("deleteAll")
const roomReadyBtn = document.getElementById("roomReady")

export const messageBoard = document.getElementById("messageBoard")

// on refresh and initial, just sets data value to blank, helps with clear waitlist function 
// as well so you dont add rooms to every list when checkbox is not check
roomType.value = ""

function addClasses() {
  if(this.name === "checkbox") {
    if (checkBox.checked) {
      roomOptions.forEach(option => option.classList.add("chosen"))
      roomType.value = "Any"
    }
    else {
      roomOptions.forEach(option => option.classList.remove("chosen"))
      roomType.value = ""
    }
  } 
    else {
      roomOptions.forEach(option => option.classList.remove("chosen"))
      checkBox.checked = false
      this.classList.add("chosen")
      roomType.value = this.outerText
  }
}

for(let i=0; i<roomOptions.length; i++){
  let choices = roomOptions[i]
  choices.addEventListener("click", addClasses);
}

const waitlistButton = document.getElementById("addToWaitlist")

add.addEventListener("click", () => {
  lockerNumber.value++
});

minus.addEventListener("click", () => {
  lockerNumber.value <= 1 ? lockerNumber.value == 1 : lockerNumber.value--;
});

waitlistButton.addEventListener("click", (e) => {
  e.preventDefault()
  createListItem()
});

export function createListItem() {
  if (lockerNumber.value.length == 0 || lockerNumber.value <= 0 || roomType.value === "") return
  const newElement = document.createElement("li")
  newElement.className = "listItems"

  const lockerNumberText = document.createElement("div")
  lockerNumberText.innerText = "Locker Number " + lockerNumber.value
  lockerNumberText.setAttribute("class", "locker-text")
  newElement.appendChild(lockerNumberText)

  const deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = "&times;"
  deleteIcon.setAttribute("class", "remove-icon");
  setRoom(newElement, deleteIcon)

  newElement.addEventListener("contextmenu", popupMenu)
}

function setRoom(newElement, deleteIcon) {
  let list
  
  if (roomType.value === "") {
    return
  }
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
      list = "any"
  }
  newElement.appendChild(deleteIcon)
  // adds locker to each list instead of just one list
  if (list === "any") {
    Array.from(allGroups).forEach(element => {
      element.appendChild(newElement.cloneNode(true))
      element.addEventListener("contextmenu", popupMenu)
      element.addEventListener("click", removeLocker)
    })
  // adds locker to individual list
  } else {
    list.appendChild(newElement)
    newElement.addEventListener("contextmenu", popupMenu)
    list.addEventListener("click", removeLocker)
    newElement.setAttribute("title", list.title)
  }
}

function removeLocker(e) {
  // this function accounts for event bubbling which allows me to add an event listener
  // to the parent element rather than every element of the list, this helped me solve
  // memory leak issues I had with stacked event listeners for cloned elements
  if (e.target.matches(".remove-icon")) {
    const locker = e.target.parentNode
    locker.remove()
    popup.classList.remove("active")
  }
}

function popupMenu(e) {
  e.preventDefault()
  const lockerItem = e.target
  // if contextclick hits the x button or any space outside of list items then do nothing, 
  // not sure how to have normal contextmenu event take place
  if (lockerItem.matches(".remove-icon") || lockerItem.matches(".roomList")) {
    return
  }
  const lockerNumber = lockerItem.textContent.replace(/(×)/ig,"")

  const { clientX: mouseX, clientY: mouseY } = e

  popup.style.top = `${mouseY}px`
  popup.style.left = `${mouseX}px`

  popup.classList.add("active")

  deleteAllBtn.innerText = `Delete ${lockerNumber} from all lists`
  roomReadyBtn.innerText = `${lockerNumber} Room is Ready!`

  localStorage.setItem("lockernumber", lockerNumber)
}

const scope = document.querySelector("body")

scope.addEventListener("mousedown", function(e) {
  if (e.target.offsetParent != popup) {
    popup.classList.remove("active")
  }
})

deleteAllBtn.addEventListener("click", removeEachLocker)

function removeEachLocker() {
  const number = localStorage.getItem("lockernumber")
  Array.from(allGroups).forEach(lockerList => {
    const listItems = lockerList.getElementsByTagName("li")
    const numberArray = Array.from(listItems)
    numberArray.forEach(locker => {
      if (locker.textContent.replace(/(×)/ig, '') == number) {
        locker.remove()
      }
    })
  })
  popup.classList.remove("active")
}

roomReadyBtn.addEventListener("click", lockerReady)

export function lockerReady(e) {
  const number = localStorage.getItem("lockernumber")
  const newMessage = document.createElement("div")
  newMessage.setAttribute("class", "readyMessage");
  newMessage.innerText = `${number}`
  messageBoard.appendChild(newMessage)

  newMessage.addEventListener("click", removeMessageBoardLocker)

  const deleteIcon = document.createElement("button");
  deleteIcon.setAttribute("class", "trash")
  deleteIcon.innerHTML = '<i class="fas fa-trash"></i>'
  newMessage.appendChild(deleteIcon)

  // this checks for whether the function is being called manually with a click function aka the popUp menu or if not, then its being called by firebase to append on refresh or page load
  if(e.type === "click") {
    if(confirm(`Would you like to delete each ${number} from waitlist? Cancel will still announce ${number} ready on the message board.`)) {
      removeEachLocker()
    } else e.preventDefault()
  }
  popup.classList.remove("active")
}

function removeMessageBoardLocker(e) {
  // this function accounts for event bubbling which allows me to add an event listener
  // to the parent element and target the trash symbol with the click rather than every element
  if (e.target.matches(".fa-trash")) {
    const locker = e.target.parentNode.parentNode
    locker.remove()
  }
}

