import React, { useEffect, useState } from 'react'
import IconCross from '../icons/IconCross'
import ErrorMsg from '../ErrorMsg'


function NewSubtaskInput({id, placeholder, newSubtasks, setNewSubtasks}) {

    

  const deleteError = () =>{

    const inputs = document.getElementsByTagName('input')
    const errorMsgs = document.querySelectorAll('.error-msg')

    const inputArray = [...inputs]

    inputArray.forEach((input, index) => {
        input.classList.remove('input-error')
        errorMsgs[index].classList.add('hidden')
    })
}

    const [currentValue, setCurrentValue] = useState('')
    
    const onChange = (e) =>{
        setCurrentValue(e.target.value)
        
    }

  
    
  return (
    <div className='new-column-input' key={id}>
      <div className="input-container">
      <input itemID={id} className='new-column-input input' id='board-columns' value={currentValue} name='board-columns' type="text" placeholder={placeholder ? "e.g. "+placeholder : ""}  onChange={(e) => {
        deleteError()
        onChange(e)
      }}/>
    <ErrorMsg></ErrorMsg>
      </div>
        <IconCross newSubtasks={newSubtasks} setNewSubtasks={setNewSubtasks} id={id}></IconCross>
    </div>
  )
}

export default NewSubtaskInput