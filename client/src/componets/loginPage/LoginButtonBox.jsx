import React, { useState } from 'react';

function LoginButtonBox() {
  const [currentForm, setCurrentForm] = useState('login');

  const switchForm = (formType) => {
    const signUpForm = document.querySelector('.sing-up-form');
    const signInForm = document.querySelector('.sing-in-form');

    if (formType === 'register') {
      signUpForm.style.left = '0';
      signInForm.style.left = '-300px';
    } else {
      signUpForm.style.left = '300px';
      signInForm.style.left = '0px';
    }

    setCurrentForm(formType);

   
  }

  return (
    <div className="login-button-box">
      <button
        type="button"
        name="login"
        className={`switch-login-btn switch-from-btn heading-m ${
          currentForm === 'login' ? 'main-btn' : 'secondary-btn'
        }`}
        onClick={() => switchForm('login')}
      >
        Login
      </button>
      <button
        type="button"
        name="register"
        className={`switch-register-btn switch-from-btn  heading-m ${
          currentForm === 'register' ? 'main-btn' : 'secondary-btn' 
        }`}
        onClick={() => switchForm('register')}
      >
        Register
      </button>
    </div>
  );
}

export default LoginButtonBox;
