import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemInfo } from "./ItemInfo"

export const KeyItems = () => {

    const [keyI, setKeyI] = useState([])
    const [selectKeyI, setSelecKeyI] = useState({})
    const { gameId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/keyItems`)
                .then(res => res.json())
                .then((data) => {
                    setKeyI(data)
                })
        },
        []
    )

    const handleKeyItemSelect = (evt) => {
        const test = keyI.find( info  => {
            return (info.id === parseInt(evt.target.value))
        
    })
    setSelecKeyI(test)
    }

    const keyItemDataPost = () => {
        return (
            <>  
                
            <h3>Key Item</h3>
                <div>Name: {selectKeyI.name}</div>         
                <div>Game: {selectKeyI.game}</div>         
                <div>Description: {selectKeyI.description}</div>                  
                {/* {selectKeyI?.id ? <ItemInfo selectKeyI={selectKeyI}/> : <h2>Choose an item, kupo!</h2>} */}
            </>
        )
        }

    return (
        <>
            
            <select defaultValue="" name="keyItem" id={keyI.id} className="form-control" placeholder="Select a Key Item"
                onChange={handleKeyItemSelect}>
                <option value="">Choose a key item!</option>
                {keyI.map(ki => { return <option key={ki.id} value={ki.id}>{ki.name}</option> })}
            </select>
            
            <div>
            {keyItemDataPost}
                </div>
        </>
    )
}