import React, { useState, useEffect } from "react"
import "./Characters.css"
import { useParams } from "react-router-dom"

export const CharacterInfo = ({ selectCh }) => {
    const [game, setGame] = useState({})
    
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/games/${gameId}`)
            .then(res => res.json())
            .then(setGame)
        },
        [gameId]  
        )

    const abilityList = () => {
        return selectCh.abilities.map((ability) => (
            <>
                <ul>{ability}</ul>
            </>
        ))
    }

    const limitBreakList = () => {
        return selectCh.limitBreak.map((lb) => (
            <>
                <ul>{lb}</ul>
            </>
        ))
    }

    return (
        <>
                <div className={game.id === 1 ? "charInfo_1" : game.id === 2 ? "charInfo_2" : game.id === 3 ? "charInfo_3" : ""}>
                <section className={ game.id === 1 ? "charData_1" : game.id === 2 ? "charData_2" : game.id === 3 ? "charData_3" : "" }>

                    <h3 className={ game.id === 1 ? "title_1" : game.id === 2 ? "title_2" : game.id === 3 ? "title_3" : "" }>Character Data</h3>
                    <div>Name: {selectCh.name}</div><br />

                    <div>Description: {selectCh.description}</div><br />

                    <div>Ability: {selectCh.abilityDescription}</div>
                    <div>{abilityList()}</div><br />


                    <div>Limit Break: {selectCh.limitBreakDescr}</div><br />
                    <div>{limitBreakList()}</div><br/>
                </section>

                <aside className="charImg">
                    <div className="profile">
                        <img style={{maxWidth: "100%", maxHeight: "100%", marginLeft: "180px"}} src={`http://localhost:8080/${selectCh.image}`} key={selectCh} />
                    </div><br/>
                </aside>
                </div>
        </>
    )
}

