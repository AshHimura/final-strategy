import React, { useState } from "react"
import { useHistory } from "react-router";


export const NoteForm = () => {
    const [note, updateNote] = useState({ 
        description: "",
        
    });
    const history = useHistory()

    
    const saveNote = (event) => {

        event.preventDefault()
        
        const newNote= { 
            userNote: note.userNotes,

            userId: parseInt(localStorage.getItem("strategy_user")),
            dateCreated: ""
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        }

        return fetch("http://localhost:8088/notes", fetchOption)
        .then(() => {
            history.push("/notes")
        })
    }

    return (
        <form className="noteForm">
            <h2 className="noteForm__title">New Note Entry</h2>
            <fieldset>
                <div className="form-group">
                    <label className="nLabel" htmlFor="notes">Strategy Notes:</label>
                    <textarea rows="4" cols="50"
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What do I need to remember..."
                        onChange={
                            (evt) => {
                                const copy = {...note}
                                copy.userNotes = evt.target.value
                                updateNote(copy)
                            }
                        } /> 
                </div>
            </fieldset>
    
            <button className="btn_btn-primary" onClick={saveNote}>
                Submit Notes
            </button>
        </form>
    )
}
