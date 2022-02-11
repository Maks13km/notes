let name = ""
let description = ""
let notes = []
let toDo = [] //объялвем переменные

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
        let toDoString = ""
        for (let j in notes[i].toDo) {
            if (notes[i].toDo[j].done) {
                toDoString +=

                    `
                <li>
                    <div class="checkbox">
                        <span class="material-icons uncheck undisplay">
                            radio_button_unchecked

                        </span>
                        <span class="material-icons check">
                            task_alt
                        </span>
                    </div>
                    
                    <p> ${notes[i].toDo[j].value} </p>
                </li>
                `
            } else {
                toDoString +=
                    `
                <li>
                    <div data-note="${i}" data-task="${j}" class="checkbox">
                        <span class="material-icons check">
                            radio_button_unchecked
                        </span>
                        <span class="material-icons uncheck undisplay">
                            task_alt
                        </span>
                    </div>
                    
                    <p> ${notes[i].toDo[j].value} </p>
                </li>
                `
            }

        }

        toDisplay +=
            `
            <div class="note">
                <div class="delete">
                    <span class="material-icons">
                        close
                    </span>
                </div>
                <div class="note_name">
                    ${notes[i].name}
                </div>
                <ul class="note_description">   
                    ${toDoString}
                </ul>
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

function deleteInputs() {
    let inputs = document.querySelectorAll(".toDo")
    for (let i in inputs) {
        if (i != 0) {
            try {
                inputs[i].parentNode.removeChild(inputs[i])
            } catch {
                console.log()
            }
        }
    }
}

function addInput() {
    let elem = document.createElement("input")
    elem.type = "text"
    elem.classList = "form_input toDo"
    elem.placeholder = "Что еще будете делать"
    document.querySelector(".form").insertBefore(
        elem,
        document.querySelector(".add_input"))
}

document.addEventListener("DOMContentLoaded", function() {
    if (getFromLocale("notes")) {
        notes = getFromLocale("notes")
    }
    printNotes()

    document.querySelector("#add_note").addEventListener("click", () => {
        name = document.querySelector("#name").value
        let toDoElem = document.querySelectorAll(".toDo")
        toDo = []
        for (let i of toDoElem) {
            toDo.push({
                value: i.value,
                done: false
            })
        }
        if (validate(name)) {
            notes.push({
                name: name,
                toDo: toDo,
            })

            saveToLocale("notes", notes)
            deleteInputs()
            printNotes()
        }
        document.querySelector("#name").value = ""
        document.querySelector("#description").value = ""
    })

    document.querySelector(".add_input").addEventListener("click", function() {
        addInput()
    })
})
