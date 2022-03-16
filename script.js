let notes = []
let toDo = {}
let priority = "3"
let toDisplay = ""
let description = ""
let sort1 = ""
let sort2 = ""
let id = 0

// async function getNotes() {
//     let promis= await fetch('http://127.0.0.1:3000/items').then(res => res)
// }

function validate(description) { //функция валидации
    // console.log(description.trim()) //метод trim удаляет лишние пробелы
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

function doneNote(index) {
    notes[index].done = true
        // console.log(toDo.done)
    saveToLocale("notes", notes)
    printNotes()
}

// function cancelNote(index) {
//     notes[index].classList.toggle("red")
//     saveToLocale("notes", notes)
//     printNotes()
// }

// function fun1() {
//     var chbox;
//     chbox = document.getElementById('id');
//     if (chbox.checked) {
//         console.log("выбран");
//     } else {
//         console.log('Не выбран');
//     }
// }




function printNotes() {
    let toDisplay = ""
    for (let i in notes) {
        let priority = ""
        if (notes[i].priority == 3) {
            priority = "High"
        } else if (notes[i].priority == 2) {
            priority = "Medium"
        } else if (notes[i].priority == 1) {
            priority = "Low"
        }
        let checkDone = ""
        if (notes[i].done == false) {
            checkDone = "Не выполнено"
        } else {
            checkDone = "Выполнено"
        }
        if (notes[i].done == false) {
            toDisplay +=
                `
                <div class="note">
                <div class="note_priority ${priority}">
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
                </div>
                <div class="note_description">
                    <div class="note_description_text">
                        ${notes[i].description}
                    </div>
            
                    <div class="note_description_date">
                        ${notes[i].date}
                    </div>
                    <div class="note_description_done">
                        ${checkDone}
                    </div>
            
                </div>
            </div>
            `
        } else {

            toDisplay +=
                `
                <div class="note">
                <div class="note_priority ${priority}">
                    ${priority}
                </div>

                <div class="edit">
                    <div class="delete">
                        <span class="material-icons">
                    delete
                    </span>
                    </div>
                    <div class="cancel">
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
                    <div class="note_description_done">
                        ${checkDone}
                    </div>

                </div>
            </div>
            `
        }
    }
    document.querySelector('.notes_container').innerHTML = toDisplay
    let deleteButtons = document.getElementsByClassName("delete")
    for (let i in [...deleteButtons]) {
        deleteButtons[i].addEventListener("click", () => {
            deleteNote(i)
        })
    }


    let doneButtons = document.getElementsByClassName("done")
    for (let i in [...doneButtons]) {
        doneButtons[i].addEventListener("click", () => {
            doneNote(i)
        })
    }

    // let cancelButtons = document.getElementsByClassName("cancel")
    // for (let i in [...doneButtons]) {
    //     cancelButtons[i].addEventListener("click", () => {
    //         cancelNote(i)
    //     })
    // }

}



document.addEventListener("DOMContentLoaded", function() {
    if (getFromLocale("notes")) {
        notes = getFromLocale("notes")
    }
    printNotes()


    // const checkbox = document.querySelector('.checkbox');
    // checkbox.addEventListener('change', function() {
    //     if (this.checked) {
    //         console.log('checked');
    //     } else console.log('unchecked');
    // })


    document.querySelector(".addCircle").addEventListener("click", () => {
        description = document.querySelector("#description").value
        toDo.description = description.trim()
        toDo.priority = priority
        toDo.date = new Date().toLocaleTimeString()
        toDo.done = false;
        toDo.id = id + 1

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
