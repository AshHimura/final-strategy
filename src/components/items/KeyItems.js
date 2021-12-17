import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const KeyItems = ({
    setSelectKeyI,
    setSelectEquipI,
    setSelectBattleI
}) => {
    const [keyI, setKeyI] = useState([])
    const [filterKey, setFilterKey] = useState([])
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/joinedItemList?_expand=keyItems&_expand=games`)
                .then(res => res.json())
                .then((data) => {
                    setKeyI(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setFilterKey(keyI.filter(eq => (eq.gamesId === parseInt(gameId) && eq.keyItemsId)))
        }, [keyI]
    )

    const clearEquipBattle = () => {
        setSelectEquipI({})
        setSelectBattleI({})
    }

    const handleKeyItemSelect = (evt) => {
        const test = filterKey.find(info => {
            return (info.keyItems.id === parseInt(evt.target.value))

        })
        clearEquipBattle()
        setSelectKeyI(test)
    }


    return (
        <>
            <select value={keyI} name="keyItem" id={keyI.keyItemsId} className="form-control" placeholder="Select a Key Item"
                onChange={handleKeyItemSelect}>
                <option value="">Choose a key item!</option>
                {filterKey.map(ki => { return <option key={ki.keyItemsId} value={ki.keyItemsId}>{ki.keyItems.name}</option> })}
            </select>
        </>
    )
}