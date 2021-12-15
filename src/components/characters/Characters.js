import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CharacterInfo } from "./Characterinfo"

export const Characters = () => {

    const [chara, setChara] = useState([])
    const [filterCh, setFilterCh] = useState([])
    const [selectCh, setSelectCh] = useState({})
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/characters?_expand=games`)
                .then(res => res.json())
                .then((data) => {
                    setChara(data)
                })
        },
        []
    )

    useEffect(
        () => {
        setFilterCh(chara.filter(ch => ch.gamesId === parseInt(gameId)))
    }, [chara]
    )

    const handleUserSelect = (evt) => {
        const test = chara.find( info  => {
            return (info.id === parseInt(evt.target.value))
        
    })
    setSelectCh(test)
    }

    const characterDataPost = () => {
        return (
            <>                
                {selectCh?.id ? <CharacterInfo selectCh={selectCh}/> : <h2>Choose a character, kupo!</h2>}
            </>
        )
        }

    return (
        <>
            <h2>Party Members</h2>
            
            <section>
                Feel free to select a name to find out biographical info, abilities, and more!
            </section>

            <select value={chara} name="character" id={chara.id} className="form-control" placeholder="Choose your character"
                onChange={handleUserSelect}>
                <option value="">Choose your character</option>
                {filterCh.map(ch => { return <option key={ch.id} value={ch.id}>{ch.name}</option> })}
            </select>
            
            <div>
            {characterDataPost()}
                </div>
        </>
    )
}