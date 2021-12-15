import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

export const KeyItems = ({
    keyI,
    setKeyI,
    setSelectKeyI,
    setSelectEquipI,
    setSelectBattleI
}) => {

    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/keyItems`)
                .then(res => res.json())
                .then((data) => {
                    setKeyI(data)
                })
        },
        []
    )

    const clearEquipBattle = () => {
        setSelectEquipI({})
        setSelectBattleI({})
    }

    const handleKeyItemSelect = (evt) => {
        const test = keyI.find(info => {
            return (info.id === parseInt(evt.target.value))

        })
        clearEquipBattle()
        setSelectKeyI(test)
    }


    return (
        <>

            <select value={keyI} name="keyItem" id={keyI.id} className="form-control" placeholder="Select a Key Item"
                onChange={handleKeyItemSelect}>
                <option value="">Choose a key item!</option>
                {keyI.map(ki => { return <option key={ki.id} value={ki.id}>{ki.name}</option> })}
            </select>

        </>
    )
}