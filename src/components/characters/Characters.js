import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CharacterInfo } from "./Characterinfo";

export const Characters = () => {

    const [chara, setChara] = useState([])
    const [selectCh, setSelectCh] = useState({})
    const { characterId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/characters?_expand=games`)
            .then(res => res.json())
            .then((data) => {
                setChara(data)
            })
        },
        [characterId]
    )

    const handleUserSelect = (evt) => {
        const copy = {...selectCh}
        copy[evt.target.id] = parseInt(evt.target.value)
        setSelectCh(copy)
    }

    return (
        <>
            <h2>Party Members</h2>
            <section>
                Feel free to select a name to find out biographical info, abilities, and more!
            </section>

            <select defaultValue="" name="character" id={chara.id} className="form-control" placeholder="Choose your character"
            onChange={handleUserSelect}>
                <option value="">Choose your character</option>
                {chara.map(ch => {return <option key={ch.id} value={ch.id}>{ch.name}</option>})}
            </select>
            
        </>
    )





}