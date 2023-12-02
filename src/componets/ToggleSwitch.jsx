import React from 'react'
import { themeContext } from '../context/Context'
import { useContext } from 'react'


function ToggleSwitch({setDarkTheme}) {



    const [theme, setTheme] = useContext(themeContext) || 'light'

    const themeSwitch = (e) => {
        if (e.target.checked){
            setDarkTheme(true)
            setTheme('dark')
        } else {
            setDarkTheme(false)
            setTheme('light')
        }
    }

    return (
        <label className="switch">
            <input id='theme-toggle' type="checkbox"  onChange={themeSwitch}/>
            <span className="slider round"></span>
        </label>




    )
}

export default ToggleSwitch