import React, { useEffect } from "react"

export const BattleItems = ({
    battleI,
    setBattleI,
    setSelectKeyI,
    setSelectEquipI,
    setSelectBattleI
}) => {

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

    const clearKeyEquip = () => {
        setSelectKeyI({})
        setSelectEquipI({})
    }

    const handleBattleItemSelect = (evt) => {
        const test = battleI.find(info => {
            return (info.id === parseInt(evt.target.value))

        })
        clearKeyEquip()
        setSelectBattleI(test)
    }

    return (
        <>

            <select value={battleI} name="battleItem" id={battleI.id} className="form-control" placeholder="Select a Battle Item"
                onChange={handleBattleItemSelect}>
                <option value="">Choose a battle item!</option>
                {battleI.map(ba => { return <option key={ba.id} value={ba.id}>{ba.name}</option> })}
            </select>

        </>
    )
}