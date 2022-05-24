import { useState } from 'react';

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
    </div>
  );
};

export default Home;
