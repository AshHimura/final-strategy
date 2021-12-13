import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const Games = () => {
    const [game, setGame] = useState({})
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/games/${gameId}`)
                .then(res => res.json())
                .then(setGame)
        },
        [gameId]  // Above function runs when the value of employeeId change
    )
    

    return (
        <>
            <section className="gameHome">
                <h2 className="game__name">{game.fantasyTitle}</h2>
                <div>
                Welcome to the landing page of {game.fantasyTitle}! Please feel free to view character data, item info, or start making notes for your journey!
                </div>
            </section>
        </>
    )
}
