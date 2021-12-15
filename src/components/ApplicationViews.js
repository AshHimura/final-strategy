//Route listening for click event in NavBar to determine what JSX element should be rendered to the DOM
//ApplicationViews is to listen for change in URL, evaluate all Routes, and whichever matches - the respective component will be rendered 

import React from "react"
import { Route } from "react-router-dom"
import { Games } from "./games/Game"
import { NavBar } from "./nav/NavBar"
import { SplashView } from "./SplashView"
import { Characters } from "./characters/Characters"
import { Items } from "./items/Items"
import { NoteList } from "./notes/NoteList"
import { Note } from "./notes/Notes"
import { NoteForm } from "./notes/NoteForm"






export const ApplicationViews = () => {
    return (
        <>


            <SplashView/>

            <NavBar/>

            
            <Route exact path="/game/:gameId(\d+)/characters" component={Characters}>
                <Characters />
            </Route>

    
            <Route exact path="/game/:gameId(\d+)/items" component={Items}>
                <Items />
            </Route>

            <Route exact path="/game/:gameId(\d+)">
                <Games />
            </Route>

            <Route exact path="/game/:gameId(\d+)/notes" component={NoteList}>
                <NoteList />
            </Route>
            
            <Route path="/game/:gameId(\d+)/notes/create" component={NoteForm}>
                <NoteForm />
            </Route>

            <Route exact path="/game/:gameId(\d+)/notes/:noteId(\d+)" component={Note}>
                <Note/>
            </Route>

        </>
    )
}

//Route "exact" forces html to render only that page, not any additional pages linked to it