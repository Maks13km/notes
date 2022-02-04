let name = ""
let description = ""
let notes = [] //объялвем переменные

function validate(value) { //функция валидации
    let error = document.querySelector(".error_container") //локальная переменная error 
    if (value == "") {
        error.innerHTML = "Введите заметку"
        return false //мы не можем добавить заметку без названия
    }
    if (value.length > 30) {
        error.innerHTML = "Название заметки слишком длинное"
        return false //название не больше 30 символов
    }
    for (let i of notes) {
        if (value == i.name) {
            error.innerHTML = "Такая заметка уже существует"
            return false //проверка на то ,существует ли уже заметка с таким именем
        }
    }
    error.innerHTML = "" //никаких ошибок нет, все ОК
    return true
}

function printNotes() {
    let toDisplay = ""
    for (let i in notes) {
        toDisplay +=
            `
            <div class="note">
            <div class="delete">
            x
            </div>
            <div class="note_name">
            ${notes[i].name}
            </div>
            <div class="note_description">   
            ${notes[i].descr}
            </div>
        </div>
        `
    }
    document.querySelector('.notes_container').innerHTML = toDisplay
    let deleteButtons = document.getElementsByClassName("delete")
    for (let i in [...deleteButtons]) {
        console.log(deleteButtons[i]);
        deleteButtons[i].addEventListener("click", () => {
            deleteNote(i)
        })
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

function deleteNote(index) {
    notes.splice(index, 1)
    saveToLocale("notes", notes)
    printNotes()
}

document.addEventListener("DOMContentLoaded", function() {
    if (getFromLocale("notes")) {
        notes = getFromLocale("notes")
    }
    printNotes()

    document.querySelector("#add_note").addEventListener("click", () => {
        name = document.querySelector("#name").value
        description = document.querySelector("#description").value
        if (validate(name)) {
            notes.push({
                name: name,
                descr: description,
            })
            saveToLocale("notes", notes)
            printNotes()
        }
        console.log(notes)
        document.querySelector("#name").value = ""
        document.querySelector("#description").value = ""
    })


})