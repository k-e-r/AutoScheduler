import CalendarDetail from '../../components/calendar/CalendarDetail';
import CalendarMain from '../../components/calendar/CalendarMain';
import CalendarSideMenu from '../../components/calendar/CalendarSideMenu';
import Home from '../home/Home';

import './Calendar.scss';

const Calendar = () => {
  return (
    <>
      <Home />
      <section className='calendar__wrapper'>
        <div className='calendar__mainbody'>
          <CalendarSideMenu />
          <CalendarMain />
        </div>
        <CalendarDetail />
      </section>
    </>
  );
};

export default Calendar;
