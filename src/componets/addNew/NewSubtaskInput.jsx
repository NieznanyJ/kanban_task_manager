import React, { useEffect, useState } from 'react'
import IconCross from '../icons/IconCross'


function NewSubtaskInput({id, placeholder, newSubtasks, setNewSubtasks}) {

    


    const [currentValue, setCurrentValue] = useState('')
    
    const onChange = (e) =>{
        setCurrentValue(e.target.value)
        
    }

  
    
  return (
    <div className='new-column-input' key={id}>
        <input itemID={id} className='new-column-input input' id='board-columns' value={currentValue} name='board-columns' type="text" placeholder={placeholder ? "e.g. "+placeholder : ""}  onChange={(onChange)}/>
        <IconCross newSubtasks={newSubtasks} setNewSubtasks={setNewSubtasks} id={id}></IconCross>
    </div>
  )
}

export default NewSubtaskInput