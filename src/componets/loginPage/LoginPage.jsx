import React from 'react'
import IconLogoLight from '../icons/IconLogoLight'
import IconLogoDark from '../icons/IconLogoDark'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import LoginButtonBox from './LoginButtonBox'




export const LoginPageContext = React.createContext();


function LoginPage() {
  return (
    <section className='login-page'>
      <div className="login-logo-box">
        <IconLogoLight></IconLogoLight>
      </div>

      <div className="login-forms-container">
        <SignInForm></SignInForm>
        <SignUpForm></SignUpForm>
      
      </div>

      
      <LoginButtonBox></LoginButtonBox>

    </section>
  )
}

export default LoginPage