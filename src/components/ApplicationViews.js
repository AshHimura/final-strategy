//Route listening for click event in NavBar to determine what JSX element should be rendered to the DOM
//ApplicationViews is to listen for change in URL, evaluate all Routes, and whichever matches - the respective component will be rendered 

import React from "react"
import { Route } from "react-router-dom"
import { SplashPage } from "./landing/SplashPage"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/welcome">
                <SplashPage/>
            </Route>
            <Route exact path="/game/:gameId(\d+)">
                <Games />
            </Route>

        </>
    )
}

//Route "exact" forces html to render only that page, not any additional pages linked to it