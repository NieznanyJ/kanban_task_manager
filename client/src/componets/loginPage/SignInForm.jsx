import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/Context'


function SignInForm() {

  const [logged, setLogged, username, setUsername, getData, setAuthToken, cookies, setCookie, removeCookie] = useContext(UserContext)
 




  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)  

  const loginUser = async (user) => {
    const response = await fetch(`${process.env.SERVER_URL}/users/login/${user.username}/${user.password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    })
    const json = await response.json()
    console.log(json)
    if (!json.error) {

      
      setCookie('authToken', json.token)
      console.log(json.token)
      setCookie('Username', json.userInfo.username)  
    
      setAuthToken(true)
      setLogged(true)
      setUsername(json.userInfo.username)
      getData()

      window.location.reload()
      return true
    }
    else {
      setError("Wrong username or password")
      return false
    } 
  }

  const [error, setError] = useState(null)

  const handleLogin = (e) => {

    e.preventDefault();
    setError(null)
    const currentUser = {
      username: user,
      password: password
    
    }
    loginUser(currentUser) 
  }

  return (
    <form onSubmit={handleLogin} className="login-form-box sing-in-form" id='login'>
        <h1 className="login-title heading-xl">Sign in</h1>
        <div className="login-input-box">
        <label className='body-l' htmlFor="login-username">Username</label>
        <input id='login-username' name='username' type="text" placeholder='Username' autoComplete='on' required onChange={e => setUser(e.target.value)}/>
        </div>
        <div className="login-input-box">
        <label className='body-l' htmlFor="login-password">Password</label>
        <input id='login-password' name='password' type="password" placeholder='Password' autoComplete='on' required onChange={e => setPassword(e.target.value)}/>
        </div>
        {error && <p className='body-l'>{error}</p>}
        <button type='submit' className='btn main-btn heading-m'>Sing in</button>
      </form>
  )
}

export default SignInForm
