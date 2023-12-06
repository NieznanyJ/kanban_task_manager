import React from 'react'

function IconElipse({setShowBoardOptionModal, setShowTaskOptionModal}) {
  return (
    <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg" style={{zIndex : "10", cursor: "pointer"}} onClick={() => {
      setShowBoardOptionModal && setShowBoardOptionModal(prev => {return !prev})
      setShowTaskOptionModal && setShowTaskOptionModal(prev => {return !prev})
    }}><g fill="#828FA3" fillRule="evenodd">
      <circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
  )
}

export default IconElipse