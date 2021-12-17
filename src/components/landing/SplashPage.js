import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
import intro from '../music/intro.mp3'
import { Link } from "react-router-dom";
import './SplashPage.css'
import '../../index.css'

export const SplashPage = () => {
    const [showPage, setShowPage] = useState(false)
    const [games, setGame] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [play, {stop}] = useSound(intro, {volume: 0.08})
    
    useEffect(
        () => {
            fetch("http://localhost:8088/games")
            .then(res => res.json())
            .then((data) => {
                setGame(data)
            })
        }, [])

    const playSong = () => {
        setIsPlaying(true)
        play()
    }

    const stopSong = () => {
        setIsPlaying(false)
        stop()
    }
    return (
        <>
            <div className="container">
                <button onClick={()=>{setShowPage(!showPage); playSong()}}>Welcome</button>

                {showPage ? <div> 
            <li className="splashbar__item active">
            <Link className="splashbar__link" to="#" onClick={
                () => {
                    localStorage.removeItem("strategy_user")
                }
            }>Logout!</Link>
                </li>

                <h1>Final Strategy</h1>
                <div> 
                    {
                        games.map((gameObj) => {
                            return <Link to={`/game/${parseInt(gameObj.id)}`} id={gameObj.id}> 
                            <img key={gameObj.id} src={`http://localhost:8080/${gameObj.img}`} alt={gameObj.alt} />
                        </Link>
                    })}
                    </div>
                    </div> :null}

                    <div>
                    <button onClick={isPlaying ? stopSong : playSong}>Stop Music</button>
                    </div>

            </div>
        </>
    )
}

//Logout button to escape from page in general