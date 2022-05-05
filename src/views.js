import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

//Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Set up the note title text
    if(note.title.length > 0) {
        textEl.textContent = note.title
     } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = lastUpdatedBefore(note.updatedAt)
    noteEl.appendChild(statusEl)
    statusEl.classList.add('list-item__subtitle')

    return noteEl
}

//Render Notes 
const renderNotes = () => {
    const notesEl =  document.querySelector('#allNotes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter( (note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((filteredNote)=>{
            const newNote = generateNoteDOM(filteredNote)
            notesEl.appendChild(newNote) 
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

// Update last edited message
const lastUpdatedBefore = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const updatelastElement = document.querySelector('#last-edited')
    
    const notes = getNotes()
    const note = notes.find( (note) => note.id === noteId)

    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    updatelastElement.textContent = lastUpdatedBefore(note.updatedAt)
}

export  { generateNoteDOM, renderNotes, lastUpdatedBefore, initializeEditPage }

