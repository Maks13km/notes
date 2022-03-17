let notes = []
let toDo = {}
let priority = "3"
let toDisplay = ""
let description = ""
let sort1 = ""
let sort2 = ""

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
    // console.log(notes[i].id)
    let promise = await fetch (`http://127.0.0.1:3000/items/${id}`,{
        method: 'DELETE',

    }).then();
    printNotes()
}

// function deleteNote() {
//     deleteNoteServer(toDo.id).then(result =>  getNotes().then( res => printNotes()));
// }

function validate(description) { //функция валидации
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


function doneNote(id) {
    let note = notes.find( el => el.id === id);
     note.done = true;
    // saveToLocale("notes", notes)
     putNote(note).then(result =>  getNotes().then( res => printNotes()));
}

function cancelNote(id) {
    let note = notes.find( el => el.id === id);
    note.done = false;
    // note.classList.toggle("red")
    // saveToLocale("notes", notes)
    putNote(note).then(result =>  getNotes().then( res => printNotes()));
}


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
                        <span class="material-icons" onclick="deleteNote(${notes[i].id})">
                    delete
                    </span>
                    </div>
                    <div class="done">
                        <span class="material-icons" onclick="doneNote(${notes[i].id})"> 
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
                        <span class="material-icons" onclick="deleteNote(${notes[i].id})">
                    delete
                    </span>
                    </div>
                    <div class="cancel">
                        <span class="material-icons" onclick="cancelNote(${notes[i].id})">
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
    //let deleteButtons = document.getElementsByClassName("delete")
    //for (let i in [...deleteButtons]) {
       /* deleteButtons[i].addEventListener("click", () => {
            deleteNote(toDo.id).then(result =>  getNotes().then( res => printNotes()));
        })*/
    // }


    // let doneButtons = document.getElementsByClassName("done")
    // for (let i in [...doneButtons]) {
    //     doneButtons[i].addEventListener("click", () => {
    //         doneNote(toDo)
    //     })
    // }

    // let cancelButtons = document.getElementsByClassName("cancel")
    // for (let i in [...doneButtons]) {
    //     cancelButtons[i].addEventListener("click", () => {
    //         cancelNote(i)
    //     })
    // }

}



document.addEventListener("DOMContentLoaded", function() {
  /*  if (getFromLocale("notes")) {
        notes = getFromLocale("notes")
    }*/
    getNotes()
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


        if (validate(toDo.description)) {
            postNote(toDo).then(result =>  getNotes().then( res => printNotes()));
           toDo = {}
        }
        console.log(notes)
        // saveToLocale("notes", notes)

        // getNotes().then();

        document.querySelector("#description").value = ""

    })

    document.querySelector(".priority").addEventListener("change", (e) => {
            priority = e.target.value

        })
})
