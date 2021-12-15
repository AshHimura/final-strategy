import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Items = () => {
    const [keyI, setKeyI] = useState([])
    const [equipI, setEquipI] = useState([])
    const [battleI, setBattleI] = useState([])
    const [selectKeyI, setSelectKeyI] = useState({})
    const [selectEquipI, setSelectEquipI] = useState({})
    const [selectBattleI, setSelectBattleI] = useState({})
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

    const clearEquipBattle = () => {
        setSelectEquipI({})
        setSelectBattleI({})
    }
    
    const clearKeyBattle = () => {
        setSelectKeyI({})
        setSelectBattleI({})
    }
    
    const clearKeyEquip = () => {
        setSelectKeyI({})
        setSelectEquipI({})
    }

    const handleKeyItemSelect = (evt) => {
        const test = keyI.find(info => {
            return (info.id === parseInt(evt.target.value))

        })
        clearEquipBattle()
        setSelectKeyI(test)
    }

    const handleEquipItemSelect = (evt) => {
        const test = equipI.find(info => {
            return (info.id === parseInt(evt.target.value))

        })
        clearKeyBattle()
        setSelectEquipI(test)
    }

    const handleBattleItemSelect = (evt) => {
        const test = battleI.find(info => {
            return (info.id === parseInt(evt.target.value))

        })
        clearKeyEquip()
        setSelectBattleI(test)
    }

    const keyItemDataPost = () => {
        return (
            <>
                {selectKeyI?.id && selectEquipI?.id ? `Can't do that, kupo!` : selectKeyI?.id && selectBattleI?.id ? `Can't do that, kupo!` : selectKeyI?.id ?
                    <>
                        <h3>Key Item</h3>
                        <div>Name: {selectKeyI.name}</div>
                        <div>Game: {selectKeyI.game}</div>
                        <div>Description: {selectKeyI.description}</div>
                    </>
                    : ""}
            </>
        ) 
        
    }


    const equipItemDataPost = () => {
        return (
            <>
                {selectKeyI?.id && selectEquipI?.id ? "" : selectEquipI?.id && selectBattleI?.id ? `Can't do that, kupo!` : selectEquipI?.id ?
                    <>
                        <h3>Equipment</h3>
                        <div>Name: {selectEquipI.name}</div>
                        <div>Type: {selectEquipI.type}</div>
                        <div>Description: {selectEquipI.description}</div>
                        <div>Effect: {selectEquipI.effect}</div>
                    </> : ""}
            </>
        )
    }

    const battleItemDataPost = () => {
        return (
            <>
                {selectEquipI?.id && selectBattleI?.id ? "" : selectKeyI?.id && selectBattleI?.id ? "" : selectBattleI?.id ?
                    <>
                        <h3>Items in Battle</h3>
                        <div>Name: {selectBattleI.name}</div>
                        <div>Effect: {selectBattleI.effect}</div>
                    </> : ""}
            </>
        )
    }

    return (
        <>

            <h2>Choose an item, kupo!</h2>

            <select name="keyItem" value={keyI} id={keyI.id} className="form-control" placeholder="Select a Key Item"
                onChange={handleKeyItemSelect}>
                <option value="">Choose a key item!</option>
                {keyI.map(ki => { return <option key={ki.id} value={ki.id}>{ki.name}</option> })}
            </select>


            <select name="equipItem" value={equipI} id={equipI.id} className="form-control" placeholder="Select equipment!"
                onChange={handleEquipItemSelect}>
                <option value="">Choose some equipment!</option>
                {equipI.map(eq => { return <option key={eq.id} value={eq.id}>{eq.name}</option> })}
            </select>


            <select name="battleItem" value={battleI} id={battleI.id} className="form-control" placeholder="Select a Battle Item"
                onChange={handleBattleItemSelect}>
                <option value="">Choose a battle item!</option>
                {battleI.map(ba => { return <option bkey={ba.id} value={ba.id}>{ba.name}</option> })}
            </select>

            <div>
                {keyItemDataPost()}
                {equipItemDataPost()}
                {battleItemDataPost()}
            </div>

        </>
    )
}
