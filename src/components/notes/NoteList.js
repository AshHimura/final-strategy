import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"

export const NoteList = () => {
    const [notes, updateNotes] = useState([])
    const [filterNotes, setFilterNotes] = useState([])
    const history = useHistory()
    const { gameId } = useParams()

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

        useEffect(
            () => {
                setFilterNotes(notes.filter(no => no.gamesId === parseInt(gameId)))
            }, [notes]
        )

        const deleteNote = (id) => {
        fetch(`http://localhost:8088/notes/${id}`, {
            method: 'DELETE'
        }).then(getNotes())
        .then(() => {
            history.push(`/game/${gameId}/notes`)
        })
    }

    return (
        <>
            <h2>Strategy Note</h2>
            <div className="ticketButton">
                <button onClick={() => history.push(`/game/${gameId}/notes/create`)}>Create note entry!</button>
            </div>

            <div>
                {
                    filterNotes.map(
                        (note) => {
                            return <div key={`note--${note.id}`}>
                                <p className={`noteList`}>
                                    <Link to={`/game/${gameId}/notes/${note.id}`}>Strat Note #{note.id}</Link>
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