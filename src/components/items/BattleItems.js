import React, { useEffect, useState } from "react"
import { ItemInfo } from "./ItemInfo"

export const BattleItems = () => {

    const [battleI, setBattleI] = useState([])
    const [selectBattleI, setSelecBattleI] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/battleItems`)
                .then(res => res.json())
                .then((data) => {
                    setBattleI(data)
                })
        },
        []
    )

    const handleBattleItemSelect = (evt) => {
        const test = battleI.find( info  => {
            return (info.id === parseInt(evt.target.value))
        
    })
    setSelecBattleI(test)
    }

    const battleItemDataPost = () => {
        return (
            <>            
            <h3>Items in Battle</h3>
                <div>Name: {selectBattleI.name}</div>         
                <div>Effect: {selectBattleI.effect}</div>         
                {/* {selectBattleI?.id ? <ItemInfo selectBattleI={selectBattleI}/> : <h2>Choose an item, kupo!</h2>} */}
            </>
        )
        }

    return (
        <>
            
            <select defaultValue="" name="battleItem" id={battleI.id} className="form-control" placeholder="Select a Battle Item"
                onChange={handleBattleItemSelect}>
                <option value="">Choose a battle item!</option>
                {battleI.map(ba => { return <option bkey={ba.id} value={ba.id}>{ba.name}</option> })}
            </select>
            
            <div>
            {battleItemDataPost()}
                </div>
        </>
    )
}