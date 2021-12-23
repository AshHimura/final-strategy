import React, { useState, useEffect, useRef } from 'react'
import intro from '../music/intro.mp3'
import { Link } from "react-router-dom";
import './SplashPage.css'
import '../../index.css'

export const SplashPage = () => {
    const [games, setGame] = useState([])
    const [users, setUsers] = useState([])
    const [filUsers, setFilUsers] = useState([])
    const audio = useRef()

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

    useEffect(() => {
        audio.current = new Audio(intro)
        audio.current.play()
        audio.current.volume = 1
        audio.current.loop = true
    }, [])

    useEffect(() => {
        return () => {
            audio.current.pause()
        }
    }, [])

    return (
        <>
            <div className="container">

                <div>
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
                                    <img key={gameObj.id} src={`http://localhost:8080/${gameObj.img}`} alt={gameObj.alt} />
                                </Link>
                            })}
                    </div>

                </div>
            </div>
        </>
    )
}

//Logout button to escape from page in general