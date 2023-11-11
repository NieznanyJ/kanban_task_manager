import React from 'react'

function SignInForm() {
  return (
    <form className="login-form-box sing-in-form" id='login'>
        <h1 className="login-title heading-xl">Sign in</h1>
        <div className="login-input-box">
        <label className='body-l' htmlFor="login-username">Username</label>
        <input id='login-username' name='username' type="text" placeholder='Username' autoComplete='on' required/>
        </div>
        <div className="login-input-box">
        <label className='body-l' htmlFor="login-password">Password</label>
        <input id='login-password' name='password' type="password" placeholder='Password' autoComplete='on' required/>
        </div>

        <button className='btn main-btn heading-m'>Sing in</button>
      </form>
  )
}

export default SignInForm