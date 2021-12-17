import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const Equipment = ({
    setSelectKeyI,
    setSelectEquipI,
    setSelectBattleI,
}) => {

    const [equipI, setEquipI] = useState([])
    const [filterEquip, setFilterEquip] = useState([])
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch("http://localhost:8088/joinedItemList?_expand=equipment&_expand=games")
                .then(res => res.json())
                .then((data) => {
                    setEquipI(data)
                })
        },
        []
    )


    useEffect(
        () => {
            setFilterEquip(equipI.filter(eq => (eq.gamesId === parseInt(gameId) && eq.equipmentId)))
        }, [equipI]
    )

    const clearKeyBattle = () => {
        setSelectKeyI({})
        setSelectBattleI({})
    }

    const handleEquipItemSelect = (evt) => {
        const test = filterEquip.find(info => {
            return (info.equipment.id === parseInt(evt.target.value))
        })
        clearKeyBattle()
        setSelectEquipI(test)
    }

    return (
        <>
            <select value={equipI} name="equipItem" id={equipI.equipmentId} className="form-control" placeholder="Select equipment!"
                onChange={handleEquipItemSelect}>
                <option value="">Choose some equipment!</option>
                {filterEquip.map((eq => { return <option key={eq.equipmentId} value={eq.equipmentId}>{eq.equipment.name}</option> }))}
            </select>
        </>
    )
}