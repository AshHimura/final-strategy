//Route listening for click event in NavBar to determine what JSX element should be rendered to the DOM
//ApplicationViews is to listen for change in URL, evaluate all Routes, and whichever matches - the respective component will be rendered 

import React from "react"
import { Route, Switch } from "react-router-dom"
import { Games } from "./games/Game"
import { NavBar } from "./nav/NavBar"
import { SplashView } from "./SplashView"
import { Characters } from "./characters/Characters"
import { Items } from "./items/Items"
import { NoteList } from "./notes/NoteList"
import { Note } from "./notes/Notes"
import { NoteForm } from "./notes/NoteForm"




//Splashview first & separate component to avoid Navbar, nav will render for everything else, exact used due to gameId use
//Routes main page for all components
export const ApplicationViews = () => {
    return (
        <>


            <SplashView />


            <Switch>
                <Route exact path="/game/:gameId(\d+)/characters" >
                <NavBar />
                    <Characters />
                </Route>


                <Route exact path="/game/:gameId(\d+)/items">
                <NavBar />
                    <Items />
                </Route>

                <Route exact path="/game/:gameId(\d+)">
                <NavBar />
                    <Games />
                </Route>


                <Route exact path="/game/:gameId(\d+)/notes" >
                <NavBar />
                    <NoteList />
                </Route>


                <Route exact path="/game/:gameId(\d+)/notes/create" >
                <NavBar />
                    <NoteForm />
                </Route>

                <Route path="/game/:gameId(\d+)/notes/:noteId(\d+)" >
                <NavBar />
                    <Note />
                </Route>
            </Switch>
        </>
    )
}

//Route "exact" forces html to render only that page, not any additional pages linked to it