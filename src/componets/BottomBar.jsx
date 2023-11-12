import React, { useContext } from 'react'
import { UserContext } from '../context/Context'

function BottomBar() {

    const [logged, setLogged, username] = useContext(UserContext)

    const signOut = (e) =>{
        console.log("signing out")
    }

  return (
    <div className="bottom-bar">
        <h4 className="user-name body-l">Welcome {username}</h4>
        <button className='btn btn-red sign-out-btn body-l' onClick={signOut}>Sign out</button>
    </div>
  )
}

export default BottomBar