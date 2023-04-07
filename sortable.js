import Sortable from '/node_modules/sortablejs/modular/sortable.core.esm.js';
// import Sortable from 'sortablejs'

const groupOne = document.getElementById("list1")
const groupTwo = document.getElementById("list2")
const groupThree = document.getElementById("list3")
const groupFour = document.getElementById("list4")
const groupFive = document.getElementById("list5")


const defaultSort = {
  group: 'shared',
  animation: 300,
  ghostClass: 'dimmed',
  dragClass: 'dragged'
}

const sortable1 = Sortable.create(groupOne, defaultSort)
const sortable2 = Sortable.create(groupTwo, defaultSort)
const sortable3 = Sortable.create(groupThree, defaultSort)
const sortable4 = Sortable.create(groupFour, defaultSort)
const sortable5 = Sortable.create(groupFive, defaultSort)