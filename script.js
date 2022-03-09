let notes = []
let toDo = {}
let priority = "High"
let toDisplay = ""
let description = ""

function validate(description) { //функция валидации
    console.log(description.trim()) //метод trim удаляет лишние пробелы
    let error = document.querySelector(".error_container")
    if (description == "") {
        error.innerHTML = "Введите заметку"
        return false
    }
    // for (let i of notes) {
    //     if (value == i.description) {
    //         error.innerHTML = "Такая заметка уже существует"
    //         return false //проверка на то ,существует ли уже заметка с таким именем
    //     }
    // }
    error.innerHTML = "" //никаких ошибок нет, все ОК
    return true
}

function saveToLocale(key, obj) {  // сохранение в локал сторидж
    if (obj) {
        localStorage.setItem(key, JSON.stringify(obj))
    } else {
        localStorage.setItem(key, null)
    }
}

function getFromLocale(key) {  // получение из локал сториджа
    return JSON.parse(localStorage.getItem(key))
}

function deleteNote(index) {
    notes.splice(index, 1)
    saveToLocale("notes", notes)
    printNotes()
}

function printNotes() {
    let toDisplay = ""
    for (let i in notes) {
        toDisplay += '<br>' + notes[i].description
    }
    document.querySelector('.notes_container').innerHTML = toDisplay
        // let deleteButtons = document.getElementsByClassName("delete")
        // for (let i in [...deleteButtons]) {
        //     deleteButtons[i].addEventListener("click", () => {
        //         deleteNote(i)
        //     })
        // }
}

document.addEventListener("DOMContentLoaded", function() {
    if (getFromLocale("notes")) {
        notes = getFromLocale("notes")
    }
    printNotes()


    document.querySelector(".addCircle").addEventListener("click", () => {
        description = document.querySelector("#description").value
        toDo.description = description.trim()
        toDo.priority = priority
        toDo.date = Date.now()

        if (validate(toDo.description)) {
            notes.push(toDo)
            toDo = {}
        }
        console.log(notes)
        saveToLocale("notes", notes)
        printNotes()
        document.querySelector("#description").value = ""

    })

    document.querySelector(".priority").addEventListener("change", (e) => {
        priority = e.target.value

    })
})
