import React from 'react'

function ToggleSwitch({setDarkTheme}) {

    const setTheme = (e) => {
        if (e.target.checked){
            setDarkTheme(true)
        } else {
            setDarkTheme(false)
        }
    }

    return (
        <label className="switch">
            <input id='theme-toggle' type="checkbox"  onChange={setTheme}/>
            <span className="slider round"></span>
        </label>




    )
}

export default ToggleSwitch