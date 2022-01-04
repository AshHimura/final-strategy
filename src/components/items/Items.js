import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { BattleItems } from "./BattleItems"
import { KeyItems } from "./KeyItems"
import { Equipment } from "./Equipment"
import "./Items.css"
import battle6 from '../music/Battle_Theme.mp3'
import battlex from '../music/ffx_battle.flac'
import battle7 from '../music/battles_begin.mp3'
import { FF6Carousel } from "../carousel/FF6Carousel"


export const Items = () => {
    const [selectKeyI, setSelectKeyI] = useState({})
    const [selectEquipI, setSelectEquipI] = useState({})
    const [selectBattleI, setSelectBattleI] = useState({})
    const [game, setGame] = useState({})
    const { gameId } = useParams()

    const ff6Fight = useRef()
    const ffxFight = useRef()
    const ff7rFight = useRef()

    useEffect(
        () => {
            fetch(`http://localhost:8088/games/${gameId}`)
                .then(res => res.json())
                .then(setGame)
        },
        [gameId]
    )

    useEffect(() => {
        if (parseInt(gameId) === 1) {
            ff6Fight.current = new Audio(battle6)
            ff6Fight.current.play()
            ff6Fight.current.volume = 0.04
            ff6Fight.current.loop = true
        }
    }, [])

    //After render, if page id  = 2, music pauses
    useEffect(() => {
        if (parseInt(gameId) === 1) {
            return () => {
                ff6Fight.current.pause()
            }
        }
    }, [])

    useEffect(() => {
        if (parseInt(gameId) === 2) {
            ffxFight.current = new Audio(battlex)
            ffxFight.current.play()
            ffxFight.current.volume = 0.04
            ffxFight.current.loop = true
        }
    }, [])

    //After render, if page id  = 2, music pauses
    useEffect(() => {
        if (parseInt(gameId) === 2) {
            return () => {
                ffxFight.current.pause()
            }
        }
    }, [])

    useEffect(() => {
        if (parseInt(gameId) === 3) {
            ff7rFight.current = new Audio(battle7)
            ff7rFight.current.play()
            ff7rFight.current.volume = 0.04
            ff7rFight.current.loop = true
        }
    }, [])

    //After render, if page id  = 2, music pauses
    useEffect(() => {
        if (parseInt(gameId) === 3) {
            return () => {
                ff7rFight.current.pause()
            }
        }
    }, [])

    const keyItemDataPost = () => {
        return (
            <>
                {selectKeyI.keyItemsId && selectEquipI.equipmentId ? `Can't do that, kupo!` : selectKeyI.keyItemsId && selectBattleI.battleItemsId ? `Can't do that, kupo!` : selectKeyI.keyItemsId ?
                    <>
                        <h3>Key Items from {selectKeyI?.games?.fantasyTitle}</h3>
                        <div>Name: {selectKeyI.keyItems.name}</div><br />
                        <div>Description: {selectKeyI.keyItems.description}</div><br />
                    </>
                    : ""}
            </>
        )
    }

    const equipmentList = () => {
        return selectEquipI.equipment.effects.map((effect) => (
            <>
                <ul>{effect}</ul>
            </>
        ))
    }

    const equipItemDataPost = () => {
        return (
            <>
                {selectKeyI.keyItemsId && selectEquipI.equipmentId ? "" : selectEquipI.equipmentId && selectBattleI.battleItemsId ? `Can't do that, kupo!` : selectEquipI.equipmentId ?
                    <>
                        <h3>{selectEquipI?.games?.fantasyTitle} Equipment</h3>
                        <div>Name: {selectEquipI.equipment.name}</div><br />
                        <div>Type: {selectEquipI.equipment.type}</div><br />
                        <div>Description: {selectEquipI.equipment.description}</div>
                        <ul>Effect: {equipmentList()}</ul>
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
                        <div>Name: {selectBattleI.battleItems.name}</div><br />
                        <div>Effect: {selectBattleI.battleItems.effect}</div>
                    </>
                    : ""}
            </>
        )
    }

    return (
        <>
            <div className={game.id === 1 ? "itemPg_1" : game.id === 2 ? "itemPg_2" : game.id === 3 ? "itemPg_3" : ""}>
                <br />
                <br />
                <br />
                <br />

                <h2 className="selectItem"> Choose an item, kupo!</h2>


                <div className="item">
                    <KeyItems setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />

                    <BattleItems setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />

                    <Equipment setSelectKeyI={setSelectKeyI} setSelectEquipI={setSelectEquipI} setSelectBattleI={setSelectBattleI} />
                </div>
                <div>
                <div className={game.id === 1 ? "itemData_1" : game.id === 2 ? "itemData_2" : game.id === 3 ? "itemData_3" : ""}>
                    {keyItemDataPost()}
                    {equipItemDataPost()}
                    {battleItemDataPost()}
                </div>
                <aside>
                <FF6Carousel/>
                </aside>
                </div>
            </div>
        </>
    )
}