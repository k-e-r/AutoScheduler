import React from 'react';

import './AuthLogin.scss';

import useAuth from '../../hooks/useAuth';

const AuthLogin = () => {
  const { authLogin } = useAuth();

  return (
    <div className='authlogin__wrapper'>
      <div className='authlogin__box'>
        <div className='authlogin__box__logo'>
          <p className='authlogin__box__logo-p'>LOGO</p>
        </div>
        <div className='authlogin__box__welcome'>
          <p className='authlogin__box__welcome-p'>Hi, Welcome Back</p>
        </div>
        <div className='authlogin__box__msg'>
          <p className='authlogin__box__msg-p'>Sign in with Email address</p>
        </div>
        <form onSubmit={authLogin} className='authlogin__box__form'>
          <div className='authlogin__box__form-emailbox'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              // defaultValue={desc}
              required
              autoComplete='off'
            />
          </div>
          <div className='authlogin__box__form-passwordbox'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              // defaultValue={desc}
              required
              autoComplete='off'
            />
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <div className='authlogin__box__registerBtn'>Register</div>
      </div>
    </div>
  );
};

export default AuthLogin;
