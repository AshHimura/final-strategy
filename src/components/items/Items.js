import React, { useState } from "react"
import { BattleItems } from "./BattleItems"
import { KeyItems } from "./KeyItems"
import { Equipment } from "./Equipment"

export const Items = () => {
    const [selectKeyI, setSelectKeyI] = useState({})
    const [selectEquipI, setSelectEquipI] = useState({})
    const [selectBattleI, setSelectBattleI] = useState({})

    const keyItemDataPost = () => {
        return (
            <>
                {selectKeyI.keyItemsId && selectEquipI.equipmentId ? `Can't do that, kupo!` : selectKeyI.keyItemsId && selectBattleI.battleItemsId ? `Can't do that, kupo!` : selectKeyI.keyItemsId ?
                    <>
                        <h3>Key Items from {selectKeyI?.games?.fantasyTitle}</h3>
                        <div>Name: {selectKeyI.keyItems.name}</div>
                        <div>Description: {selectKeyI.keyItems.description}</div>
                    </>
                    : ""}
            </>
        )
    }
    const equipItemDataPost = () => {
        return (
            <>
                {selectKeyI.keyItemsId && selectEquipI.equipmentId ? "" : selectEquipI.equipmentId && selectBattleI.battleItemsId ? `Can't do that, kupo!` : selectEquipI.equipmentId ?
                    <>
                        <h3>{selectEquipI?.games?.fantasyTitle} Equipment</h3>
                        <div>Name: {selectEquipI.equipment.name}</div>
                        <div>Type: {selectEquipI.equipment.type}</div>
                        <div>Description: {selectEquipI.equipment.description}</div>
                        <div>Effect: {selectEquipI.equipment.effects}</div>
                    </> : ""}
            </>
        )
    }

    const battleItemDataPost = () => {
        return (
            <>
                {selectEquipI.equipmentId && selectBattleI.battleItemsId ? "" : selectKeyI.keyItemsId && selectBattleI.battleItemsId ? "" : selectBattleI.battleItemsId ?
                    <>
                        <h3>{selectBattleI?.games?.fantasyTitle} Items in Battle</h3>
                        <div>Name: {selectBattleI.battleItems.name}</div>
                        <div>Effect: {selectBattleI.battleItems.effect}</div>
                    </>
                    : ""}
            </>
        )
    }

    return (
        <>

            <h2>Choose an item, kupo!</h2>

            <div className="item">
                <KeyItems setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />

                <BattleItems setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />

                <Equipment setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />
            </div>

            <div>
                {keyItemDataPost()}
                {equipItemDataPost()}
                {battleItemDataPost()}
            </div>
        </>
    )
}
