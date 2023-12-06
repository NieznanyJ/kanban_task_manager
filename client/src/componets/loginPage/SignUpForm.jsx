import React, { useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/Context'
import { useContext } from 'react'

function SignUpForm() {

    const [logged, setLogged, username, setUsername, getData, setAuthToken] = useContext(UserContext)

    const [error, setError] = useState(null)

    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null) 

 

    const registerUser = async (newUser) => {
        const response = await fetch(`${import.meta.env.SERVER_URL}/users/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        }
    

    const handleRsgistration = (e) =>{
        e.preventDefault();
        

        if (password !== confirmPassword) {
            setError('Passwords do not match') 
           console.log(password, confirmPassword)
        }
        else{
            setError('Registration successful!') 
               
            const newUser = {
                username: username,
                password: password
            }

            registerUser(newUser)
        }

    }

    return (
        <form onSubmit={handleRsgistration} className="login-form-box sing-up-form" id='register'>
            <h1 className="login-title heading-xl">Sing Up</h1>
            <div className="login-input-box">
                <label className='body-l' htmlFor="register-username">Username</label>
                <input id='register-username' name='new-username' type="text" placeholder='Username' autoComplete='off' required onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="login-input-box">
                <label className='body-l' htmlFor="register-password">Password</label>
                <input id='register-password' name='new-password' type="password" placeholder='Password' autoComplete='off' required  onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="login-input-box">
                <label className='body-l' htmlFor="password-confirmation">Confirm password</label>
                <input id='password-confirmation' name='password-confirmation' type="password" placeholder='Confirm password' autoComplete='off' required onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            {error  && <p className='body-l'>{error}</p>}
            <button  className='btn main-btn heading-m'>Sing up</button>
        </form>
    )
}

export default SignUpForm