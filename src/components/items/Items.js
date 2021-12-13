import React, { useEffect, useState } from "react"
import { useParams } from "react-router";
import { KeyItems } from "./KeyItems";

export const Items = () => {
    const [count, setCount] = useState(0)    

    const handleAdd = () => {
        setCount(count + 1)
    }

    return (
        <>
            <h2>Party Members</h2>
            <KeyItems handleAdd={handleAdd}/>
            {count}
        </>
    )
}