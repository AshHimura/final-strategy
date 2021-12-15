import React, { useEffect, useState } from "react"
import { ItemInfo } from "./ItemInfo"

export const Equipment = () => {

    const [equipI, setEquipI] = useState([])
    const [selectEquipI, setSelecEquipI] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/equipment`)
                .then(res => res.json())
                .then((data) => {
                    setEquipI(data)
                })
        },
        []
    )

    const handleEquipItemSelect = (evt) => {
        const test = equipI.find( info  => {
            return (info.id === parseInt(evt.target.value))
        
    })
    setSelecEquipI(test)
    }

    const equipItemDataPost = () => {
        return (
            <>                
            <h3>Equipment</h3>
                <div>Name: {selectEquipI.name}</div>         
                <div>Type: {selectEquipI.type}</div>         
                <div>Description: {selectEquipI.description}</div>  
                <div>Effect: {selectEquipI.effect}</div>  
                {/* {selectEquipI?.id ? <ItemInfo selectEquipI={selectEquipI}/> : ""} */}
            </>
        )
        }

    return (
        <>
            
            <select defaultValue="" name="equipItem" id={equipI.id} className="form-control" placeholder="Select equipment!"
                onChange={handleEquipItemSelect}>
                <option value="">Choose some equipment!</option>
                {equipI.map(eq => { return <option key={eq.id} value={eq.id}>{eq.name}</option> })}
            </select>
            
            <div>
                {equipItemDataPost()}
                </div>
        </>
    )
}