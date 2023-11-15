import React from 'react'

function ErrorMsg({titleError}) {


    return (
        <span  className={titleError ? 'error-msg body-l hidden' : 'error-msg title-error body-l hidden'} >Can't be empty</span>
    )
}

export default ErrorMsg