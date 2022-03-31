let notes = []
let toDo = {}
let priority = "3"
//let toDisplay = ""
let description = ""
let filter = {
    completed: false,
    priority: [],
}


async function getNotes() {
    let promise = await fetch('http://127.0.0.1:3000/items')
        .then(res => res.json())
        .then(massive => notes = massive);
}

async function postNote( note ) {
    let promise = await fetch('http://127.0.0.1:3000/items' , {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
    }).then(res => console.log(res) );
}


async function putNote( note ) {
    let promise = await fetch(`http://127.0.0.1:3000/items/${note.id}`, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
    }).then();
}

async function deleteNote(id) {
    let promise = await fetch (`http://127.0.0.1:3000/items/${id}`,{
        method: 'DELETE',
    }).then(res => getNotes().then(res => printNotes(notes) ));
}

function validate(description) { //функция валидации
    error = document.querySelector(".error_container")
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

function editNote(id) {
     let note = notes.find(el => el.id === id);
     note.description = document.getElementById(`note_description_${id}`).value
    console.log(note.description)
    putNote(note).then(result =>  getNotes().then( res => printNotes(notes)))
}


function doneNote(id) {
    let note = notes.find( el => el.id === id);
     note.done = true;
     putNote(note).then(result =>  getNotes().then( res => printNotes(notes)));
}

function cancelNote(id) {
    let note = notes.find( el => el.id === id);
    note.done = false;
    putNote(note).then(result =>  getNotes().then( res => printNotes(notes)));
}

function printNotes(mas) {
    let toDisplay = ""
    let changeIcon = ""
    let colorNote = ""
    for (let item of mas) {
   
        let priority = ""
        if (item.priority == 3) {
            priority = "High"
        } else if (item.priority == 2) {
            priority = "Medium"
        } else if (item.priority == 1) {
            priority = "Low"
        }
        let checkDone = ""
        if (item.done == false) {
            checkDone = "Не выполнено"
        } else {
            checkDone = "Выполнено"
        }
        if (item.done == false) {
            changeIcon =
                `
                <div class="done">
                     <span class="material-icons" onclick="doneNote(${item.id})">
                         done
                     </span>
                </div>
                `
            colorNote =
                `<div class="note" >
                `
        } else {
            changeIcon =
                `
            <div class="cancel">
                <span class="material-icons" onclick="cancelNote(${item.id})">
                    close
                </span>
            </div>
            `
            colorNote =
                `<div class="note green" >
                `
        }
        toDisplay +=
            `
                    ${colorNote}
                    <div class="note_priority ${priority}">
                        ${priority}
                    </div>

                    <div class="edit">
                        <div class="delete">
                            <span class="material-icons" onclick="deleteNote(${item.id})" >
                            delete
                        </span>
                        </div>
                       ${changeIcon}
                    </div>
                    <div class="note_description">
                        <textarea class="note_description_text" id="note_description_${item.id}" onblur = "editNote(${item.id})" >
                            ${item.description}
                        </textarea>
                        <div class="note_description_date">
                            ${item.date}
                        </div>
                        <div class="note_description_done">
                            ${checkDone}
                        </div>

                    </div>
                </div>
                `
        document.querySelector('.notes_container').innerHTML = toDisplay
    }
}


    function resetCheckbox() {
        let uncheck=document.querySelectorAll('.checkbox');
        for(let i=0;i<uncheck.length;i++) {
            if(uncheck[i].type=='checkbox') {
                uncheck[i].checked=false;
            }
        }
    }

    function changePriority() {
        filter.priority = []
        for (let j of priorities) {
            if (j.checked) {
                filter.priority.push(j.value)
            }
        }
        filtration()
    }

    function filtration() {
        let filteredNotes = [...notes]
        filteredNotes = filteredNotes.filter((item) => {
            if (item.done === filter.completed) {
                if (filter.priority.length == 0) {
                    return item;
                } else if (filter.priority.includes(item.priority)) {
                    return item
                }
            }
        })
        document.querySelector(".date").onclick = function () {
            filteredNotes.reverse();
            printNotes(filteredNotes)
        }
        printNotes(filteredNotes)
        console.log("фильтрованные заметки ", filteredNotes, "нефильтрованные", notes)
    }

      document.querySelector(".date").onclick = function () {
          notes.reverse();
          printNotes(notes)
      }

    document.querySelector("#done").onchange = function () {
        filter.completed = this.checked;
        filtration()
    }


    document.querySelector("#all").onclick = function() {
        console.log( "нефильтрованные ", notes)
        printNotes(notes)
        resetCheckbox()
    }


    let priorities = document.querySelectorAll(".filter_priority")
    for (let i of priorities) {
        i.onchange = function () {
            changePriority()
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        getNotes().then(res => printNotes(notes))


        document.querySelector(".addCircle").addEventListener("click", () => {
            description = document.querySelector("#description").value
            toDo.description = description.trim()
            toDo.priority = priority
            toDo.date = new Date().toLocaleTimeString()
            toDo.done = false;
            if (validate(toDo.description)) {
                postNote(toDo).then(result => getNotes().then(res => printNotes(notes)));
                toDo = {}
            }
            // console.log(notes)
            document.querySelector("#description").value = ""

        })

        document.querySelector(".priority").addEventListener("change", (e) => {
            priority = e.target.value

        })
    })
