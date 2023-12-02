import React, { useContext } from 'react'
import IconHideSidebar from './icons/IconHideSidebar'
import { useState } from 'react'
import { AppContext, themeContext } from '../context/Context'
import IconShowSidebar from './icons/IconShowSidebar'


function HideSidebarToggle({ setShowModalBox }) {

    const [boards, setBoards, currentBoard, setCurrentBoard, sidebarHidden, setSidebarHidden] = useContext(AppContext);
    const [theme, setTheme] = useContext(themeContext)

    const toggleSidebar = () => {

        const sidebarToggle = document.querySelector('.hide-sidebar-box')
        

        if (!sidebarHidden) {
            if (sidebarToggle.classList.contains('sidebar-hidden')){
                sidebarToggle.classList.remove('sidebar-hidden')
            }
            
            setShowModalBox(false)
            const upperBar = document.querySelector('.upper-bar')
            upperBar.style.width = '100vw'
            setSidebarHidden(true)
        }
        else{
            sidebarToggle.classList.add('sidebar-hidden')
            setShowModalBox(true)
            const upperBar = document.querySelector('.upper-bar')
            upperBar.style.width = 'auto' 
            setSidebarHidden(false)
        }
    }

    return (

        <div id='hide-sidebar-box' className={theme === 'light' ? 'light-theme hide-sidebar-box  heading-m' : 'hide-sidebar-box  heading-m'} >
            {!sidebarHidden ? <><IconHideSidebar toggleSidebar={toggleSidebar}></IconHideSidebar> Hide Sidebar</> 
            :
            <IconShowSidebar sidebarHidden={sidebarHidden} toggleSidebar={toggleSidebar}></IconShowSidebar> }
        </div>

    )
}

export default HideSidebarToggle