import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import intro from '../music/intro.mp3'
import './SplashPage.css'
import '../../index.css'

export const DupeSplash = (props) => {
    const [games, setGame] = useState([])
    const [users, setUsers] = useState([])
    const [filUsers, setFilUsers] = useState([])
    const audio = useRef()
    const ff6Sp = useRef()
    const ff7RSp = useRef()

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

    //Enables audio useRef to play upon page load, sets volume to decent level at max volume for device, and loops
    useEffect(() => {
        audio.current = new Audio(intro)
        audio.current.play()
        audio.current.volume = 1
        audio.current.loop = true
    }, [])
    
    //forces audio to pause/stop when navigating away from page
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

                    <h1>Welcome back, {filUsers ? filUsers.userName : ""}. Please select another title.</h1>
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

//Logout button to escape from page in genera