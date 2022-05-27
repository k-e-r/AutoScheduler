import CalendarDetail from '../../components/calendar/CalendarDetail';
import CalendarMain from '../../components/calendar/CalendarMain';
import CalendarSideMenu from '../../components/calendar/CalendarSideMenu';

import './Calendar.scss';

const Calendar = () => {
  return (
    <section className='calendar__wrapper'>
      <div className='calendar__mainbody'>
        <CalendarSideMenu />
        <CalendarMain />
      </div>
      <CalendarDetail />
    </section>
  );
};

export default Calendar;
