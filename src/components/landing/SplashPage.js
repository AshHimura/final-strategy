import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
import intro from '../music/intro.mp3'
import { Link } from "react-router-dom";
import './SplashPage.css'
import '../../index.css'

export const SplashPage = () => {
    const [showButton, hideButton] = useState(true)
    const [showPage, setShowPage] = useState(false)
    const [games, setGame] = useState([])
    const [users, setUsers] = useState([])
    const [filUsers, setFilUsers] = useState([])
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

        useEffect(
            () => {
                fetch("http://localhost:8088/users")
                    .then(res => res.json())
                    .then((data) => {
                        setUsers(data)
                    })
            }, []
            )

            useEffect(
                () => {
                setFilUsers(users.find(user => user.id === parseInt(localStorage.getItem("strategy_user"))))
            }, [users]
            )

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
               { showButton && (<button onClick={()=>{setShowPage(!showPage); playSong(); hideButton(false)}}>Welcome</button>)}

                {showPage ? <div> 
            <li className="splashbar__item active">
            <Link className="splashbar__link" to="#" onClick={
                () => {
                    localStorage.removeItem("strategy_user")
                }
            }>Logout!</Link>
                </li>

                <h1>Final Strategy {filUsers ? filUsers.userName : ""}</h1>
                <div> 
                    {
                        games.map((gameObj) => {
                            return <Link to={`/game/${parseInt(gameObj.id)}`} id={gameObj.id}> 
                            <img key={gameObj.id} onClick={isPlaying ? stopSong : playSong} src={`http://localhost:8080/${gameObj.img}`} alt={gameObj.alt} />
                        </Link>
                    })}
                    </div>

                    </div> :null}
            </div>
        </>
    )
}

//Logout button to escape from page in general