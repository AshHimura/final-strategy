import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Note = () => {
    const [note, assignNote] = useState({})
    const { noteId } = useParams()

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

    return (
        <>
            <section className="note">
                <div className="note__description">{note.userNote} created on {note.dateCreated}</div>
            </section>
        </>
    )
}