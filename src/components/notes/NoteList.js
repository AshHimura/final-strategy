import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const NoteList = () => {
    const [notes, updateNotes] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getNotes()
        }, [])

    const getNotes = () => {
        return fetch(`http://localhost:8088/notes?_expand=user`)
            .then(response => response.json())
            .then((data) => {
                updateNotes(data)
            })
    }

    const deleteNote = (id) => {
        fetch(`http://localhost:8088/notes/${id}`, {
            method: 'DELETE'
        }).then(getNotes())
    }

    return (
        <>
            <h2>Strategy Note</h2>
            <div className="ticketButton">
                <button onClick={() => history.push("/notes/create")}>Create note entry!</button>
            </div>

            <div>
                {
                    notes.map(
                        (note) => {
                            return <div key={`note--${note.id}`}>
                                <p className={`noteList`}>
                                    <Link to={`/notes/${note.id}`}>Strat Note #{note.id}</Link>
                                    <button onClick={() => {
                                        deleteNote(note.id)
                                    }}>Delete</button>
                                </p>
                            </div>
                        }
                    )
                }
            </div>
        </>
    )
}