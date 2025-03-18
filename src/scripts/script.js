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


// on refresh and initial, just sets data value to blank, helps with clear waitlist function 
// as well so you dont add rooms to every list when checkbox is not check
roomType.value = ""
let lockerItem = null

export const messageBoard = document.getElementById("messageBoard")

const lockersReadyContainer = document.getElementById("lockersReadyContainer")

messageBoard.addEventListener("drop", addViaDrag)

messageBoard.addEventListener("dragenter", (event) => {
  if (event.target.classList.contains("dropzone")) {
    lockersReadyContainer.classList.add("dragover")
    Array.from(event.target.children).forEach(element => {
      element.classList.add("dragover")
      element.style.pointerEvents = "none";
      
    })
  }
})

messageBoard.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();

});

messageBoard.addEventListener("dragleave", (event) => {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.classList.contains("dropzone")) {
    lockersReadyContainer.classList.remove("dragover")
    Array.from(event.target.children).forEach(element => {
      element.classList.remove("dragover")
      element.style.pointerEvents = "all";
    })
  }
});

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
  lockerNumberText.setAttribute("title", roomType.value)
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
      newElement.setAttribute("title", element.title)
      newElement.firstChild.setAttribute("title", element.title)
      element.appendChild(newElement.cloneNode(true))
      element.addEventListener("contextmenu", popupMenu)
      element.addEventListener("click", removeLocker)
      element.addEventListener("dragstart", dragStore)
    })
  // adds locker to individual list
  } else {
    list.appendChild(newElement)
    newElement.setAttribute("title", list.title)
    newElement.addEventListener("contextmenu", popupMenu)
    list.addEventListener("click", removeLocker)
    newElement.addEventListener("dragstart", dragStore)
  }
}

// function that stores locker info of the dragged element so that user can mark locker ready by dragging into dropzone
function dragStore(event) {
  lockerItem = event.target
  const lockerNumber = lockerItem.textContent.replace(/(×)/ig,"")

  const listName = lockerItem.title

  localStorage.setItem("lockernumber", lockerNumber)
  localStorage.setItem("listName", listName)
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

  const listName = lockerItem.title

  const { clientX: mouseX, clientY: mouseY } = e

  popup.style.top = `${mouseY}px`
  popup.style.left = `${mouseX}px`

  popup.classList.add("active")

  deleteAllBtn.innerText = `Delete ${lockerNumber} from all lists`
  roomReadyBtn.innerText = `Mark room ready for ${lockerNumber}`

  localStorage.setItem("lockernumber", lockerNumber)
  localStorage.setItem("listName", listName)
}

function addViaDrag(event) {
  // prevent default actions when accessing drop event listener (open as a link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.classList.contains("dropzone")) {
    lockerReady(event)
    lockersReadyContainer.classList.remove("dragover")
    lockerItem = null
    Array.from(event.target.children).forEach(element => {
      element.classList.remove("dragover")
      element.style.pointerEvents = "all";
    })
  }
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

export function lockerReady(event) {
  const number = localStorage.getItem("lockernumber")
  const listName = localStorage.getItem("listName")
  const newMessage = document.createElement("div")
  newMessage.setAttribute("class", "readyMessage");
  newMessage.setAttribute("title", listName)
  newMessage.innerText = `${number}`
  messageBoard.appendChild(newMessage)

  newMessage.addEventListener("click", removeMessageBoardLocker)

  const deleteIcon = document.createElement("button");
  deleteIcon.setAttribute("class", "trash")
  deleteIcon.innerHTML = '<i class="fas fa-trash"></i>'
  newMessage.appendChild(deleteIcon)

  // this checks for whether the function is being called manually with a click function aka the popUp menu or if not, then its being called by firebase to append on refresh or page load
  if(event.type === "drop") {
    if(confirm(`Would you like to announce ${number} for a ${listName} ${(listName === "Non TV") || (listName === "Regular TV") || (listName === "Large TV") ? "room" : null} ready on the message board?`)) {
      removeEachLocker()
    } else return
  }
  removeEachLocker()
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

