import CalendarMain from '../../components/calendar/CalendarMain';
import CalendarSideMenu from '../../components/calendar/CalendarSideMenu';

import './Calendar.scss';

const Calendar = () => {
  return (
    <section className='calendar__wrapper'>
      <CalendarSideMenu />
      <CalendarMain />
    </section>
  );
};

export default Calendar;
