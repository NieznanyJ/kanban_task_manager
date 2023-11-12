import React, { useEffect, useState } from 'react'
import IconCross from '../icons/IconCross'


function NewColumnInput({id, value, newColumns, setNewColumns}) {

    


    const [currentValue, setCurrentValue] = useState(value)
    
    const onChange = (e) =>{
        setCurrentValue(e.target.value)
        
    }

  
    
  return (
    <div className='new-column-input' key={id}>
        <input itemID={id} className='new-column-input input' id='board-columns' value={currentValue} name='board-columns' type="text" placeholder='e.g. Todo' onChange={(onChange)}/>
        <IconCross newColumns={newColumns} setNewColumns={setNewColumns} id={id}></IconCross>
    </div>
  )
}

export default NewColumnInput