import './Header.scss';
import { Menu2 } from 'tabler-icons-react';
import { Settings } from 'tabler-icons-react';

const Header = ({ onSidebarOpen }) => {
  return (
    <header className='header'>
      <div className='header__left-items'>
        <button onClick={onSidebarOpen}>
          <Menu2 size={25} strokeWidth={1.2} className='header__menubar' />
        </button>
      </div>
      <div className='header__right-items'>
        <button>
          <Settings size={25} strokeWidth={1.2} className='header__settings' />
        </button>
      </div>
    </header>
  );
};

export default Header;
