import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './SplashPage.css'
import '../../index.css'

export const SplashPage = () => {
    const [games, setGame] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/games")
                .then(res => res.json())
                .then((data) => {
                    setGame(data)
                })
        }, [])


    return (
        <>
            <div className="container">

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
                        return <Link to={`/game/${parseInt(gameObj.id)}`} id="link"> 
                            <img key={gameObj.id} src={`http://localhost:8080/${gameObj.img}`} alt={gameObj.alt} />
                        </Link>
                    })}
                    </div>

            </div>
        </>
    )
}

//Logout button to escape from page in general