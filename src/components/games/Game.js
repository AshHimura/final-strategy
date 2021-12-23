import React, { useState, useEffect, useRef, useCallback } from "react"
import { useParams } from "react-router-dom"
import zanarkand from '../music/To_Zanarkand.flac'
//import overW from '../music/FF6Overworld.mp3'
import '../../index.css'
import './Games.css'

export const Games = () => {
    const [game, setGame] = useState({}) 
    //hook to add local "game" state as object. Can use setGame to update state.

    const ffxSp = useRef()
    //useRef returns an object whose .current property is initialized to whatever the passed argument is

    //const ff6Sp = useRef()

    const { gameId } = useParams()
    //object of key/value pairs of URL parameters. Must match with current route
    
    // After render, fetches game info from api. Only changes if gameId does
    useEffect(
        () => {
            fetch(`http://localhost:8088/games/${gameId}`)
            .then(res => res.json())
            .then(setGame)
        },
        [gameId]  
        )
    
    //After render, plays audio based on gameId 2
        useEffect(() => {
            if (parseInt(gameId) === 2) {
                ffxSp.current = new Audio(zanarkand)
                ffxSp.current.play()
                ffxSp.current.volume = 1
                ffxSp.current.loop = true 
            }
        }, [])  

    //After render, if page id  = 2, music pauses
    useEffect(() => {
        if (parseInt(gameId) === 2) {
            return () => {
                ffxSp.current.pause()
            }
        }
    }, [])

    //     useEffect(() => {
    //         if (parseInt(gameId) === 1) {
    //             ff6Sp.current = new Audio(overW)
    //             ff6Sp.current.play()
    //             ff6Sp.current.volume = 0.03
    //             ff6Sp.current.loop = true 
    //         }
    //     }, [])

    // useEffect(() => {
    //     if (parseInt(gameId) === 1) {
    //         return () => {
    //             ff6Sp.current.pause()
    //         }
    //     }
    // }, [])    

    return (
        <>
            <div className={ game.id === 1 ? "container_1" : game.id === 2 ? "container_2" : game.id === 3 ? "container_3" : "" }>

            <section className="gameHome">
                <h2 className="game__name">{game.fantasyTitle}</h2>
                <div>
                    Welcome to the landing page of {game.fantasyTitle}! Please feel free to view character data, item info, or start making notes for your journey!
                </div>
            </section>
            
            </div>
        </>
    )
}
