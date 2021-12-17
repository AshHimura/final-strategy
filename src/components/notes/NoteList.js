import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"

export const NoteList = () => {
    const [notes, updateNotes] = useState([])
    const [filterNotes, setFilterNotes] = useState([])
    const history = useHistory()
    const { gameId } = useParams()
    const loggedInUser = localStorage.getItem("strategy_user")

    useEffect(
        () => {
            fetch(`http://localhost:8088/strategyNotes?userId=${loggedInUser}`)
                .then(response => response.json())
                .then((data) => {
                    updateNotes(data)
                })
        }, []
    )

    useEffect(
        () => {
            setFilterNotes(notes.filter((no) => no.gamesId === parseInt(gameId)))
        }, [notes]
    )

    const deleteNote = (id) => {
        return fetch(`http://localhost:8088/strategyNotes/${id}`, {
            method: "DELETE",
        }).then(() => {
            fetch(`http://localhost:8088/strategyNotes?userId=${loggedInUser}`)
                .then(response => response.json())
                .then((data) => {
                    setFilterNotes(data)
                })
                .then(() => {
                    history.push(`/game/${gameId}/notes`)
                })
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