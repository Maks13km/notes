let notes = []
let description = ""

function printNotes() {
    let toDisplay = ""
    for (let i in notes) {

        toDisplay += notes[i].name

    }
}

function saveToLocale(key, obj) {
    if (obj) {
        localStorage.setItem(key, JSON.stringify(obj))
    } else {
        localStorage.setItem(key, null)
    }
}

function getFromLocale(key) {
    return JSON.parse(localStorage.getItem(key))
}


document.addEventListener("DOMContentLoaded", function() {
    if (getFromLocale("notes")) {
        notes = getFromLocale("notes")
    }
    printNotes()
})

document.querySelector(".btn").addEventListener("click", () => {
    let toDoElem = document.querySelectorAll(".toDo")
    toDo = []
    for (let i of toDoElem) {
        toDo.push({
            value: i.value,
            done: false
        })
    }
})
