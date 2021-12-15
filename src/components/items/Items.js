import React, { useState } from "react"
import { BattleItems } from "./BattleItems"
import { KeyItems } from "./KeyItems"
import { Equipment } from "./Equipment"

export const Items = (props) => {
    const [keyI, setKeyI] = useState([])
    const [equipI, setEquipI] = useState([])
    const [battleI, setBattleI] = useState([])
    const [selectKeyI, setSelectKeyI] = useState({})
    const [selectEquipI, setSelectEquipI] = useState({})
    const [selectBattleI, setSelectBattleI] = useState({})

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
                    </>
                    : ""}
            </>
        )
    }

    return (
        <>

            <h2>Choose an item, kupo!</h2>

            <div className="item">
                <KeyItems keyI={keyI} setKeyI={setKeyI} setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />

                <BattleItems battleI={battleI} setBattleI={setBattleI} setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />

                <Equipment equipI={equipI} setEquipI={setEquipI} setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />
            </div>

            <div>
                {keyItemDataPost()}
                {equipItemDataPost()}
                {battleItemDataPost()}
            </div>
        </>
    )
}
