import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom";


export const NoteForm = () => {
    const [note, updateNote] = useState({ 
        description: "",
        
    });
    const { gameId } = useParams()
    const history = useHistory()

    
    const saveNote = (event) => {

        event.preventDefault()
        
        const newNote= { 
            userNote: note.userNote,
            gamesId: parseInt(gameId),
            userId: parseInt(localStorage.getItem("strategy_user")),
            dateCreated: new Date().toLocaleString()
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        }

        return fetch("http://localhost:8088/strategyNotes", fetchOption)
        .then(() => {
            history.push(`/game/${gameId}/notes`)
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
                                copy.userNote = evt.target.value
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
