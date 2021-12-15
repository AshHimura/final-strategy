import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const Note = () => {
    const [note, assignNote] = useState({})
    const { noteId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            return fetch(`http://localhost:8088/notes/${noteId}`)
                .then(response => response.json())
                .then((data) => {
                    assignNote(data)
                })

        },
        [noteId]
    )

    const createNote = (event) => {

        const updatedNote = {
            userNotes: note.userNotes,
            userId: note.userId,
            dateCompleted: note.dateCompleted
        }

        fetch(`http://localhost:8088/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedNote)
        })
            .then(() => {
                history.push("/notes")
            })
    }




    return (
        <>
            <section className="note">
                <div className="note__description">{note.userNote}</div>
            </section>
        </>
    )
}