import React, { useState, useEffect } from "react"
import { useParams, matchPath } from "react-router-dom"

export const Games = () => {
    const [game, setGame] = useState({})
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/games/${gameId}`)
                .then(res => res.json())
                .then(set)
        },
        [gameId]  // Above function runs when the value of employeeId change
    )

    return (
        <>
            <section className="gameHome">
                <div>
                Welcome! Please feel free to view character data, item info, or start making notes for your journey!
                </div>
            </section>
        </>

    )
}
