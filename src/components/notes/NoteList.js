import React, { useEffect, useState, useRef } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import world from '../music/Searching_for_friends.mp3'

export const NoteList = () => {
    const [notes, updateNotes] = useState([])
    const [filterNotes, setFilterNotes] = useState([])
    const [game, setGame] = useState({})
    const history = useHistory()
    const { gameId } = useParams()
    const loggedInUser = localStorage.getItem("strategy_user")

    const ff6Mood = useRef()

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
            fetch(`http://localhost:8088/games/${gameId}`)
                .then(res => res.json())
                .then(setGame)
        },
        [gameId]
    )

    useEffect(
        () => {
            setFilterNotes(notes.filter((no) => no.gamesId === parseInt(gameId)))
        }, [notes]
    )

    useEffect(() => {
        if (parseInt(gameId) === 1) {
            ff6Mood.current = new Audio(world)
            ff6Mood.current.play()
            ff6Mood.current.volume = 0.09
            ff6Mood.current.loop = true
        }
    }, [])        

    useEffect(() => {
        if (parseInt(gameId) === 1) {
            return () => {
                ff6Mood.current.pause()
            }
        }
    }, [])

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
            <section className={game.id === 1 ? "notesHome_1" : game.id === 2 ? "notesHome_2" : game.id === 3 ? "notesHome_3" : ""}><br/><br/>

            <h2 className={game.id === 1 ? "notesHomeTitle_1" : game.id === 2 ? "notesHomeTitle_2" : game.id === 3 ? "notesHomeTitle_3" : ""}>Strategy Note</h2>
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
                    </section>
        </>
    )
}