import React from 'react'

function SignUpForm() {
    return (
        <form className="login-form-box sing-up-form" id='register'>
            <h1 className="login-title heading-xl">Sing Up</h1>
            <div className="login-input-box">
                <label className='body-l' htmlFor="register-username">Username</label>
                <input id='register-username' name='new-username' type="text" placeholder='Username' autoComplete='off' required />
            </div>
            <div className="login-input-box">
                <label className='body-l' htmlFor="register-password">Password</label>
                <input id='register-password' name='new-password' type="password" placeholder='Password' autoComplete='off' required />
            </div>
            <div className="login-input-box">
                <label className='body-l' htmlFor="password-confirmation">Confirm password</label>
                <input id='password-confirmation' name='password-confirmation' type="password" placeholder='Confirm password' autoComplete='off' required />
            </div>
            <button className='btn main-btn heading-m'>Sing up</button>
        </form>
    )
}

export default SignUpForm