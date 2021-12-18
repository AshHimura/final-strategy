import React from "react"
import { KeyItems } from "./KeyItems";
import { BattleItems } from "./BattleItems";
import { Equipment } from "./Equipment";


export const ItemInfo = ({selectKeyI, selectBattleI, selectEquipI}) => { 

    
    
    return (
        <>
            <h3>Teh Items</h3>
                <div>       
        {/* {selectKeyI?.id ? <KeyItems keyItemDataPost={selectKeyI.keyItemDataPost}/> : ``}

        {selectBattleI?.id ? <BattleItems battleItemDataPost={selectBattleI.battleItemDataPost}/> : ``}

        {selectEquipI?.id ? <Equipment equipItemDataPost={selectEquipI.equipItemDataPost}/> : ``}

        {selectEquipI?.id && SelectKeyI?.id ? `Can't do that, kupo!` : ``}
        
        {selectEquipI?.id && SelectBattleI?.id ? `Can't do that, kupo!` : ``}
        
        {selectBattleI?.id && SelectKeyI?.id ? `Can't do that, kupo!` : ``} */}

        </div>        
        </>
    )
}