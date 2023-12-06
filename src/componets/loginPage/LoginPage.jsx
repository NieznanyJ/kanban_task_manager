import React, { useContext, useState } from 'react'
import IconLogoLight from '../icons/IconLogoLight'
import IconLogoDark from '../icons/IconLogoDark'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import LoginButtonBox from './LoginButtonBox'
import IconDarkTheme from '../icons/IconDarkTheme'
import IconLightTheme from '../icons/IconLightTheme'
import { themeContext } from '../../context/Context'
import ToggleSwitch from '../ToggleSwitch'


export const LoginPageContext = React.createContext();




function LoginPage() {

  const [theme, setTheme] = useContext(themeContext)

  
  

  const [darkTheme, setDarkTheme] = useState(false)

  return (
    <section className={theme === 'light' ? 'light-theme login-page' : 'login-page'}>
      <div className={theme === 'light' ? 'light-theme login-logo-box' : 'login-logo-box'}>
        {theme === 'light' ? <IconLogoDark></IconLogoDark> : <IconLogoLight></IconLogoLight>}
      </div>

      <div className="login-forms-container">
        <SignInForm></SignInForm>
        <SignUpForm></SignUpForm>
      
      </div>

      
      <LoginButtonBox></LoginButtonBox>
      <div className={theme === 'light' ? 'light-theme theme-box login-theme-box' : 'theme-box login-theme-box'}>
                    <IconLightTheme darkTheme={darkTheme}></IconLightTheme>
                    <ToggleSwitch setDarkTheme={setDarkTheme}></ToggleSwitch>
                    <IconDarkTheme darkTheme={darkTheme}></IconDarkTheme>
                </div>

    </section>
  )
}

export default LoginPage