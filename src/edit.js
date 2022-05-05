import { initializeEditPage, lastUpdatedBefore } from './views'
import { updateNote, removeNote, saveNotes } from './notes'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const updatelastElement = document.querySelector('#last-edited')
const removeElement = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    updatelastElement.textContent = lastUpdatedBefore(note.updatedAt)
    saveNotes()
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    updatelastElement.textContent = lastUpdatedBefore(note.updatedAt)
    saveNotes()
})

removeElement.addEventListener('click', () => {
    removeNote(noteId)
    saveNotes()
    location.assign("/index.html")
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        initializeEditPage(noteId)
    }
})

