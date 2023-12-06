import React from 'react'

function IconCross({newColumns, setNewColumns,id, newSubtasks, setNewSubtasks}) {

  const deleteNewColumn = (id) =>{
    
    if (newColumns){
      const currentColumns = newColumns.filter(column => column.id !== id)
      setNewColumns(currentColumns)
    }

    if(newSubtasks){
      const currentSubtasks = newSubtasks.filter(subtask => subtask.id !== id)
      setNewSubtasks(currentSubtasks)
    }

}
  return (
    <svg key={id} style={{cursor:"pointer"}} width="15" height="15" xmlns="http://www.w3.org/2000/svg" onClick={(e) => {deleteNewColumn(id)}}><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
  )
}


export default IconCross