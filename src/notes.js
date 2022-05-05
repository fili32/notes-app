import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

//Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
      return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    } 
} 

// Save notes to local Storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}
// Expose notes to localStorage
const getNotes = () => notes 

const createNote = () => {
        const newNote = {
        id: uuidv4(),
        title: '',
        body: '',
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf()
    }
   notes.push(newNote)
   saveNotes()

   return newNote.id
}

// Remove note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort your notes by one of the 3 options
const sortNotes = (sortBy) => {
        const notes = getNotes()
        if(sortBy === 'byEdited' ) {
            return notes.sort((a, b) => {
                if (a.updatedAt > b.updatedAt) {
                    return -1
                } else if (a.updatedAt < b.updatedAt) {
                    return 1
                } else {
                    return 0
                }
            })
        } else if(sortBy === 'byCreated') {
            return notes.sort((a,b) => {
                if(a.createdAt < b.createdAt) {
                    return 1
                } else if(a.createdAt > b.createdAt) {
                    return -1
                } else {
                    return 0
                }
            })
        } else if(sortBy === 'alphabetical') {
            return notes.sort((a,b) => {
                let titleA = a.title.toLowerCase()
                let titleB = b.title.toLowerCase()
                if(titleA < titleB){
                    return -1
                } else if(titleA > titleB){
                    return 1
                } else {
                    return 0
                }
            })
        } else {
            return notes
        }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)
    if (!note) {
        return
    }
    
    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body ==='string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}


notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote, saveNotes }