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

    return (
        <>
            <section className="note">
                <div className="note__description">{note.userNote}</div>
            </section>
        </>
    )
}