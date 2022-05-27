import React, { useState } from 'react';

import './AuthLogin.scss';
import { Notebook } from 'tabler-icons-react';

import useAuth from '../../hooks/useAuth';

const AuthLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { authLogin, authRegister } = useAuth();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className='authlogin__wrapper'>
      <div className='authlogin__box'>
        <div className='authlogin__box__logo'>
          <Notebook className='authlogin__box__logo-icon' />
          <p className='authlogin__box__logo-p'>AutoScheduler</p>
        </div>
        <div className='authlogin__box__welcome'>
          <p className='authlogin__box__welcome-p'>
            {isLogin ? 'Hi, Welcome Back' : 'Sign up'}
          </p>
        </div>
        <div className='authlogin__box__msg'>
          <p className='authlogin__box__msg-p'>
            {isLogin
              ? 'Login with Email address'
              : 'Sign up with Email address'}
          </p>
        </div>
        <form
          onSubmit={isLogin ? authLogin : authRegister}
          className='authlogin__box__form'
        >
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
          <button type='submit'>{isLogin ? 'Login' : 'Sign up'}</button>
        </form>
        <button
          type='button'
          className='authlogin__box__toggleBtn'
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      </div>
    </div>
  );
};

export default AuthLogin;
