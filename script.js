const groupOne = document.getElementById("list1")
const groupTwo = document.getElementById("list2")
const groupThree = document.getElementById("list3")
const groupFour = document.getElementById("list4")
const groupFive = document.getElementById("list5")

const allGroups = document.getElementsByClassName("roomList")

const lockerNumber = document.getElementById("locker")
const roomType = document.getElementById("roomType")

const button = document.getElementById("button")

const contextMenu = document.getElementById("contextMenu")

const contextMenuRemove = document.getElementById("delete")

button.addEventListener('click', () => {
  createListItem()
});

function createListItem() {
  const newElement = document.createElement('li')
  newElement.innerText = lockerNumber.value
  newElement.className = "listItems"

  const deleteIcon = document.createElement('img');
  deleteIcon.setAttribute('class', 'remove-icon');
  deleteIcon.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/375261/System_Delete.ico');

  let list
  switch(roomType.value) {
    case "non-tv":
      list = groupOne
      break;
    case "reg-tv":
      list = groupTwo
      break;
    case "large-tv":
      list = groupThree
      break;
    case "suite":
      list = groupFour
      break;
    case "deluxe":
      list = groupFive
      break;
    default:
      list = "all"
  }
  deleteIcon.addEventListener("click", function(e) {
    removeLocker(e)
  }, false)
  newElement.appendChild(deleteIcon)
  if (list === "all") {
    Array.from(allGroups).forEach(element => {
      
      const newEl = element.appendChild(newElement.cloneNode(true))
      console.log(newEl)
    })
    const clonedGroup = document.querySelectorAll(".remove-icon")
    // I have to delegate event listener individually because cloning nodes does not bring event listeners with it
    for (const clone of clonedGroup) {
      clone.addEventListener("click", removeLocker)
    }
  } else 
  list.appendChild(newElement)
}

function removeLocker(e) {
  console.log("clicked")
  var el = e.target;
  var elListItem= el.parentNode;
  elFullList = elListItem.parentNode;
  elFullList.removeChild(elListItem);
} 


// function onDragStart(event) {
//   event.dataTransfer.setData('text/plain', event.target.id)
//   event.currentTarget.style.backgroundColor = 'yellow'
// }
// function onDragOver(event) {
//   event.preventDefault();
// }
// function onDrop(event) {
//   const id = event.dataTransfer.getData('text')
//   const draggableEl = document.getElementById(id)
//   const dropzone = event.target
//   dropzone.appendChild(draggableEl)
//   event.dataTransfer.clearData()
// }





      




