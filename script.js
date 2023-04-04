const groupOne = document.getElementById("list1")
const groupTwo = document.getElementById("list2")
const groupThree = document.getElementById("list3")
const groupFour = document.getElementById("list4")

const lockerNumber = document.getElementById("locker")
const roomType = document.getElementById("roomType")

const button = document.getElementById("button")

button.addEventListener('click', () => {
  const newElement = document.createElement('li')
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
  const listItems = document.querySelectorAll("li")
  listItems.forEach((item) => {
    item.onclick = function(e) {
      this.parentNode.removeChild(this)
    }
  })
});