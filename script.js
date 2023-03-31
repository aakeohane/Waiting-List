const groupOne = document.getElementById("list1")
const groupTwo = document.getElementById("list2")
const groupThree = document.getElementById("list3")
const groupFour = document.getElementById("list4")

const listOne = [
  98, 17, 12, 19, 7, 6
]

const listTwo = [
  100, 10, 2, 33, 4, 19, 45
]

const listThree = [
  2, 7, 8
]

const listFour = [
  99, 1
]

function makeList(location, list) {
  list.forEach((item) => {
    let div = document.createElement("div");
    div.innerText = item
    div.className = "listItems"
    location.appendChild(div)
  })
}

makeList(groupOne, listOne)
makeList(groupTwo, listTwo)
makeList(groupThree, listThree)
makeList(groupFour, listFour)