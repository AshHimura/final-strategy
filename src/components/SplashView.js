import React from "react"
import { Route } from "react-router-dom"
import { SplashPage } from "./landing/SplashPage"

export const SplashView = () => {
    return (
        <>

            <Route exact path="/welcome">
                <SplashPage />
            </Route>

        </>
    )
}