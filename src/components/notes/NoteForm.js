import React, { useState, useEffect, useRef } from "react"
import { useParams, useHistory } from "react-router-dom";
import './Notes.css'
import empire from '../music/ff6Empire.mp3'
import desert from '../music/Bikanel_island.flac'
import experiment from '../music/Hojo_lab.mp3'


export const NoteForm = () => {
    const [note, updateNote] = useState({
        description: "",

    });
    const [game, setGame] = useState({})
    const { gameId } = useParams()
    const history = useHistory()

    const ff6Setting = useRef()
    const ffxSetting = useRef()
    const ff7rSetting = useRef()

    useEffect(
        () => {
            fetch(`http://localhost:8088/games/${gameId}`)
                .then(res => res.json())
                .then(setGame)
        },
        [gameId]
    )

    useEffect(() => {
        if (parseInt(gameId) === 1) {
            ff6Setting.current = new Audio(empire)
            ff6Setting.current.play()
            ff6Setting.current.volume = 0.04
            ff6Setting.current.loop = true
        }
    }, [])        

    useEffect(() => {
        if (parseInt(gameId) === 1) {
            return () => {
                ff6Setting.current.pause()
            }
        }
    }, [])

    useEffect(() => {
        if (parseInt(gameId) === 2) {
            ffxSetting.current = new Audio(desert)
            ffxSetting.current.play()
            ffxSetting.current.volume = 0.04
            ffxSetting.current.loop = true
        }
    }, [])        

    useEffect(() => {
        if (parseInt(gameId) === 2) {
            return () => {
                ffxSetting.current.pause()
            }
        }
    }, [])

    useEffect(() => {
        if (parseInt(gameId) === 3) {
            ff7rSetting.current = new Audio(experiment)
            ff7rSetting.current.play()
            ff7rSetting.current.volume = 0.8
            ff7rSetting.current.loop = true
        }
    }, [])        

    useEffect(() => {
        if (parseInt(gameId) === 3) {
            return () => {
                ff7rSetting.current.pause()
            }
        }
    }, [])

    const saveNote = (event) => {

        event.preventDefault()

        const newNote = {
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
        <section className={game.id === 1 ? "noteEntry_1" : game.id === 2 ? "noteEntry_2" : game.id === 3 ? "noteEntry_3" : ""}>
            <br />
                <br />
                <br />

            <form className={game.id === 1 ? "noteForm_1" : game.id === 2 ? "noteForm_2" : game.id === 3 ? "noteForm_3" : ""}>

                <h2 className={game.id === 1 ? "noteFormTitle_1" : game.id === 2 ? "noteFormTitle_2" : game.id === 3 ? "noteFormTitle_3" : ""}>New Note Entry</h2>
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
                                    const copy = { ...note }
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
        </section>
    )
}