import React, { useEffect, useState } from "react"
import { useParams } from "react-router";

export const Items = () => {
    const [game, setGame] = useState([])
    const [chara, setChara] = useState({
        gameId: 0,
        name: "",
        description: "",
        abilities: "",
        limitBreak: ""
    })
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/characters`)
            .then(res => res.json())
            .then(setChara)
        },
        []
    )
    
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
            <h2>Party Members</h2>
            <section>
                Feel free to select a name to find out biographical info, abilities, and more!
            </section>

            <select defaultValue="" 
            name="character" id="characterId" 
            className="form-control" 
            placeholder="Choose your character"
            onChange={(evt) => {
                const copy = {...chara}
                copy.gameId  = (evt.target.value)}
                >
                <option value="">Choose your character</option>
                {chara.map(ch =>  <option key={ch.id} value={ch.id}>{ch.name}</option>)}
            </select>

        </>
    )
}