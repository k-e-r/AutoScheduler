import { useState } from 'react';
import Calendar from '../../components/calendar/Calendar';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

import './Home.scss';

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='home'>
      <Header onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar
        onSidebarClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
      <Calendar />
    </div>
  );
};

export default Home;
