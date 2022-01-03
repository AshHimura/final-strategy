import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { CharacterInfo } from "./Characterinfo"
import figaro from '../music/edgar_and_sabin.mp3'


export const Characters = () => {

    const [chara, setChara] = useState([])
    const [filterCh, setFilterCh] = useState([])
    const [selectCh, setSelectCh] = useState({})
    const [game, setGame] = useState({})
    const { gameId } = useParams()

    const ff6 = useRef()

    useEffect(
        () => {
            fetch(`http://localhost:8088/characters?_expand=games`)
                .then(res => res.json())
                .then((data) => {
                    setChara(data)
                })
        },
        []
    )

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
                ff6.current = new Audio(figaro)
                ff6.current.play()
                ff6.current.volume = 0.04
                ff6.current.loop = true 
            }
        }, [])  

    //After render, if page id  = 2, music pauses
    useEffect(() => {
        if (parseInt(gameId) === 1) {
            return () => {
                ff6.current.pause()
            }
        }
    }, [])

    useEffect(
        () => {
            setFilterCh(chara.filter(ch => ch.gamesId === parseInt(gameId)))
        }, [chara]
    )

    const handleUserSelect = (evt) => {
        const test = chara.find(info => {
            return (info.id === parseInt(evt.target.value))

        })
        setSelectCh(test)
    }

    const characterDataPost = () => {
        return (
            <>
                {selectCh?.id ? <CharacterInfo selectCh={selectCh} /> : <h2>Choose a character, kupo!</h2>}
            </>
        )
    }

    return (
        <>
            <div className={game.id === 1 ? "charPg_1" : game.id === 2 ? "charPg_2" : game.id === 3 ? "charPg_3" : ""}><br/><br/>
                
                <section className={game.id === 1 ? "charTxt_1" : game.id === 2 ? "charTxt_2" : game.id === 3 ? "charTxt_3" : ""}>

                <h2>Party Members</h2>
                <p>
                    Feel free to select a name to find out biographical info, abilities, and more!
                </p>

                <select value={chara} name="character" id={chara.id} className="form-control" placeholder="Choose your character"
                    onChange={handleUserSelect}>
                    <option value="">Choose your character</option>
                    {filterCh.map(ch => { return <option key={ch.id} value={ch.id}>{ch.name}</option> })}
                </select>

                <div>
                    {characterDataPost()}
                </div>
                </section>
            </div>
        </>
    )
}