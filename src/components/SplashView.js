import React from "react"
import { Route } from "react-router-dom"
import { DupeSplash } from "./landing/DupeSplash"
import { SplashPage } from "./landing/SplashPage"

export const SplashView = () => {
    return (
        <>

            <Route exact path="/">
                <SplashPage />
            </Route>

        </>
    )
}
//Route leads to welcome page