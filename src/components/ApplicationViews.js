//Route listening for click event in NavBar to determine what JSX element should be rendered to the DOM
//ApplicationViews is to listen for change in URL, evaluate all Routes, and whichever matches - the respective component will be rendered 

import React from "react"
import { Route } from "react-router-dom"
import { Games } from "./games/Game"
import { NavBar } from "./nav/NavBar"
import { SplashView } from "./SplashView"
import { Characters } from "./characters/Characters"
import { CharacterInfo } from "./characters/Characterinfo"
import { ItemInfo } from "./items/ItemInfo"




export const ApplicationViews = () => {
    return (
        <>


            <SplashView/>

            <NavBar/>

            
            <Route exact path="/characters">
                <Characters />
            </Route>

    
            <Route exact path="/items">
                <ItemInfo />
            </Route>

            <Route path="/game/:gameId(\d+)">
                <Games />
            </Route>


        </>
    )
}

//Route "exact" forces html to render only that page, not any additional pages linked to it