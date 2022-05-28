import './Sidebar.scss';
import { Dashboard, CalendarEvent } from 'tabler-icons-react';

const Sidebar = ({ open, onSidebarClose }) => {
  return (
    <aside className='sidebar'>
      <div
        className={`sidebar__back ${
          open ? 'sidebar__backActive' : 'sidebar__backPassive'
        }`}
        onClick={onSidebarClose}
      />
      <div
        className={`sidebar__menu ${
          open ? 'sidebar__menuActive' : 'sidebar__menuPassive'
        }`}
      >
        <div>
          <h1 className='sidebar__logo'>AutoScheduler</h1>
        </div>
        <div className='sidebar__wrapper'>
          <span className='sidebar__wrapper-title'>Dashboard</span>
          <a href='/dashboard' className='sidebar__wrapper-menu'>
            <Dashboard className='sidebar__wrapper-menu-icon' />
            <p>Dashboard</p>
          </a>
        </div>
        <hr className='sidebar__hr' />
        <div className='sidebar__wrapper'>
          <span className='sidebar__wrapper-title'>Calender</span>
          <a href='/calendar' className='sidebar__wrapper-menu'>
            <CalendarEvent className='sidebar__wrapper-menu-icon' />
            <p>Calender</p>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
