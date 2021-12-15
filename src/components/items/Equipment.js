import React, { useEffect, useState } from "react"

export const Equipment = ({
    equipI,
    setEquipI,
    setSelectKeyI,
    setSelectEquipI,
    setSelectBattleI
}) => {

    useEffect(
        () => {
            fetch(`http://localhost:8088/equipment`)
                .then(res => res.json())
                .then((data) => {
                    setEquipI(data)
                })
        },
        []
    )

    const clearKeyBattle = () => {
        setSelectKeyI({})
        setSelectBattleI({})
    }

    const handleEquipItemSelect = (evt) => {
        const test = equipI.find(info => {
            return (info.id === parseInt(evt.target.value))

        })
        clearKeyBattle()
        setSelectEquipI(test)
    }

    return (
        <>
            
            <select value={equipI} name="equipItem" id={equipI.id} className="form-control" placeholder="Select equipment!"
                onChange={handleEquipItemSelect}>
                <option value="">Choose some equipment!</option>
                {equipI.map(eq => { return <option key={eq.id} value={eq.id}>{eq.name}</option> })}
            </select>
            
        </>
    )
}