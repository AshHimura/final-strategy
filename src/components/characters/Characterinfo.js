import React, { useEffect, useState } from "react"

export const CharacterInfo = () => {

    const [charaInfo, setCharaInfo] = useState()
    

    useEffect(
        () => {
            fetch("http://localhost:8088/characters?_expand=games")
            .then(res => res.json())
            .then((data) => {
                setCharaInfo(data)
            })
        },
        []
    )

    return (
        <>
            <h3>Dem Stats</h3>
            { 
                charaInfo.map(
                    (ch) => {
                        return <section className="character" >Name: {ch.name}</section>
                    })
            }
            {charaInfo?.name}
        </>
    )
}