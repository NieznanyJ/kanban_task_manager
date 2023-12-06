import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './app.css'
import './styles/upperBar.css'
import './styles/bottomBar.css'
import './styles/boardContent.css'
import './styles/boardModal.css'
import './styles/toggleSwitch.css'
import './styles/loginPage.css'
import './styles/addNewModal.css'
import './styles/column.css'
import './styles/deleteBoardModal.css'
import './styles/boardOptionModal.css'

import {  BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
)
