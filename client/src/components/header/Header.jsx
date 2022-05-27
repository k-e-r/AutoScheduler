import { useSelector, useDispatch } from 'react-redux';

import './Header.scss';
import { Menu2, Logout } from 'tabler-icons-react';
import { authActions } from '../../store/auth-slice';

const Header = ({ onSidebarOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userEmail);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className='header'>
      <div className='header__left-items'>
        <button onClick={onSidebarOpen}>
          <Menu2 className='header__menubar' />
        </button>
      </div>
      <div className='header__right-items'>
        <p className='header__user'>{user}</p>
        <button onClick={logoutHandler}>
          <Logout className='header__logout' />
        </button>
      </div>
    </header>
  );
};

export default Header;
