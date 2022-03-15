let notes = []
let toDo = {}
let priority = "3"
let toDisplay = ""
let description = ""
let sort = ""

function validate(description) { //функция валидации
    console.log(description.trim()) //метод trim удаляет лишние пробелы
    let error = document.querySelector(".error_container")
    if (description == "") {
        error.innerHTML = "Вы ввели пустую заметку"
        return false
    }
    for (let i of notes) {
        if (description == i.description) {
            error.innerHTML = "Такая заметка уже существует. Введите новую"
            return false //проверка на то ,существует ли уже заметка с таким именем
        }
    }
    error.innerHTML = "" //никаких ошибок нет, все ОК
    return true
}

function saveToLocale(key, obj) { // сохранение в локал сторидж
    if (obj) {
        localStorage.setItem(key, JSON.stringify(obj))
    } else {
        localStorage.setItem(key, null)
    }
}

function getFromLocale(key) { // получение из локал сториджа
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
        let priority = ""
        if (notes[i].priority == 3) {
            priority = "High"
        } else if (notes[i].priority == 2) {
            priority = "Middle"
        } else if (notes[i].priority == 1) {
            priority = "Low"
        }
        toDisplay +=
            `
            <div class="note">
            <div class="note_priority">
            ${priority}
            </div>
            <div class="edit">
                <div class="delete">
                <span class="material-icons">
                delete
                </span>
                </div>
                <div class="done">
                <span class="material-icons">
                done
                </span>
                </div>
                <div class="not_done">
                <span class="material-icons">
                close
                </span>
                </div>
            </div>
            <div class="note_description">   
                <div class="note_description_text">
                    ${notes[i].description}
                </div>
                <div class="note_description_date">
                    ${notes[i].date}
                </div>
                
            </div>
        </div>
    `
    }
    document.querySelector('.notes_container').innerHTML = toDisplay
    let deleteButtons = document.getElementsByClassName("delete")
    for (let i in [...deleteButtons]) {
        deleteButtons[i].addEventListener("click", () => {
            deleteNote(i)
        })
    }
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
        toDo.done = false

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
        // localStorage.clear()
})
