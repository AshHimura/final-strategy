import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const BattleItems = ({
    setSelectKeyI,
    setSelectEquipI,
    setSelectBattleI
}) => {
    const [battleI, setBattleI] = useState([])
    const [filterBattle, setFilterBattle] = useState([])
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/joinedItemList?_expand=battleItems&_expand=games`)
                .then(res => res.json())
                .then((data) => {
                    setBattleI(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setFilterBattle(battleI.filter(ba => (ba.gamesId === parseInt(gameId) && ba.battleItemsId)))
        }, [battleI]
    )

    const clearKeyEquip = () => {
        setSelectKeyI({})
        setSelectEquipI({})
    }

    const handleBattleItemSelect = (evt) => {
        const test = filterBattle.find(info => {
            return (info.battleItems.id === parseInt(evt.target.value))

        })
        clearKeyEquip()
        setSelectBattleI(test)
    }

    return (
        <>

            <select value={battleI} name="battleItem" id={battleI.battleItemsId} className="form-control" placeholder="Select a Battle Item"
                onChange={handleBattleItemSelect}>
                <option value="">Choose a battle item!</option>
                {filterBattle.map(ba => { return <option key={ba.battleItemsId} value={ba.battleItemsId}>{ba.battleItems.name}</option> })}
            </select>

        </>
    )
}