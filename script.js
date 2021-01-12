// Declarations 

const addBtn = document.getElementById('add')
const notes = JSON.parse(localStorage.getItem('notes'))


// Event Listeners 

addBtn.addEventListener('click', () => addNewNote())

// Functions 

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
        <i class="fas fa-trash-alt"></i>
        </button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`

    const editBtn = note.querySelector('.edit')
    const delBtn = note.querySelector('.delete')
    const mainEl = note.querySelector('.main')
    const textArea = note.querySelector('textarea')


    textArea.value = text
    mainEl.innerHTML = marked(text)

    delBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        mainEl.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
    
        mainEl.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

// Local Storage Setup 

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []
    
    notesText.forEach(note => notes.push(note.value))

    // console.log(notes)
    localStorage.setItem('notes', JSON.stringify(notes))
}

// console.log(notes)

if(notes) {
    notes.forEach(note => addNewNote(note))
}

// Local Storage API calls:
// - .setItem()
// - .getItem()
// - .removeItem()
// 
// All arguments/parameters have to be stringified

// localStorage.setItem('name', 'Diarte')
// localStorage.getItem('name')
// localStorage.removeItem('name')

