import React from "react"

export const CharacterInfo = ({ selectCh }) => {



    return (
        <>
            <h3>Dem Stats</h3>
            <div>Name: {selectCh.name}</div>

            <div>Game: {selectCh.games.fantasyTitle}</div>

            <div>Description: {selectCh.description}</div>

            <div>Abilities: {selectCh.abilities}</div>

            <div>Limit Break: {selectCh.limitBreak}</div>

            <div>Image: {selectCh.image}</div>
        </>
    )
}