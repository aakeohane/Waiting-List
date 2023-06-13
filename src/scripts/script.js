import '../styles.css'

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

const roomOptions = document.querySelectorAll(".room-options")
const checkBox = document.getElementById("checkBox")

const popup = document.getElementById("popup-menu")
const deleteAllBtn = document.getElementById("deleteAll")
const roomReadyBtn = document.getElementById("roomReady")

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
  console.log(checkBox.checked)
  e.preventDefault()
  createListItem()
});

export default function createListItem() {
  console.log(roomType.value)
  if (lockerNumber.value.length == 0 || lockerNumber.value <= 0 || roomType.value === "") return
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
      element.addEventListener('click', removeLocker)
    })
  // adds locker to individual list
  } else {
    list.appendChild(newElement)
    newElement.addEventListener("contextmenu", popupMenu)
    list.addEventListener('click', removeLocker)
  }
}

function removeLocker(e) {
  // this function accounts for event bubbling which allows me to add an event listener
  // to the parent element rather than every element of the list, this helped me solve
  // memory leak issues I had with stacked event listeners
  if (e.target.matches('.remove-icon')) {
    const xButton = e.target
    const locker = xButton.parentNode
    const lockerList = locker.parentNode
    lockerList.removeChild(locker)
    popup.classList.remove("active")
    
  }
}

function popupMenu(e) {
  const lockerItem = e.target
  const lockerNumber = lockerItem.textContent.replace(/(×)/ig, '')
  e.preventDefault()
  const { clientX: mouseX, clientY: mouseY } = e

  popup.style.top = `${mouseY}px`
  popup.style.left = `${mouseX}px`

  popup.classList.add("active")

  deleteAllBtn.innerText = `Delete each ${lockerNumber}`
  roomReadyBtn.innerText = `${lockerNumber} is Ready!`

  localStorage.setItem("lockernumber", lockerNumber)
}

let nombre

const scope = document.querySelector("body")

scope.addEventListener("mousedown", function(e) {
  if (e.target.offsetParent != popup) {
    popup.classList.remove("active")
  }
})

deleteAllBtn.addEventListener("click", removeAllLockers)

function removeAllLockers() {
  // const xButton = e.target
  // const locker = xButton.parentNode
  // const lockerList = locker.parentNode
  const number = localStorage.getItem("lockernumber")
  console.log(number)
  filterLockerNumber()
}

function filterLockerNumber() {
  const number = localStorage.getItem("lockernumber")
  document.querySelectorAll(".roomList").forEach(group => {
    
    const lockerNumber = group.querySelector(".locker-text")
    console.log(Array.from(lockerNumber))
    if (lockerNumber.textContent == number) {
      const locker = lockerNumber.parentNode
      const lockerList = locker.parentNode
      lockerList.removeChild(locker)
    }
    // console.log(number)
    
  })
  // Array.from(allGroups).forEach(element => {
  //   const listItems = element.getElementsByTagName("li")
  //   // element.filter(item => item.innerText = number)
  //   // listItems.filter(item => console.log(item.innerText))
  //   // for (const names of listItems) {
  //   //   console.log(names.innerText)
  //   // }
  //   // console.log(listItems)
  //   const numberArray = Array.from(listItems)
  //   const newList = numberArray.filter(item => item.innerText.replace(/(×)/ig, '') != number)
  //   console.log(newList)
  // })
}