import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import johnny from '../music/Johnny_c_bad.mp3'
import './Notes.css'


export const Note = () => {
    const [note, assignNote] = useState({})
    const [game, setGame] = useState({})
    const { noteId } = useParams()
    const { gameId } = useParams()

    const ff6pub = useRef()

        useEffect(
            () => {
                return fetch(`http://localhost:8088/strategyNotes/${noteId}`)
                    .then(response => response.json())
                    .then((data) => {
                        assignNote(data)
                    })
    
            },
            [noteId]
        )

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
                ff6pub.current = new Audio(johnny)
                ff6pub.current.play()
                ff6pub.current.volume = 0.09
                ff6pub.current.loop = true
            }
        }, [])        
    
        useEffect(() => {
            if (parseInt(gameId) === 1) {
                return () => {
                    ff6pub.current.pause()
                }
            }
        }, [])

    return (
        <>
        <section className={game.id === 1 ? "notes_1" : game.id === 2 ? "notes_2" : game.id === 3 ? "notes_3" : ""}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div>
                <p className={game.id === 1 ? "notes__description1" : game.id === 2 ? "notes__description2" : game.id === 3 ? "notes__description3" : ""}>{note.userNote} created on {note.dateCreated}</p>
            </div>
        </section>
        </>
    )
}