import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import './Calendar.scss';

const Calendar = () => {
  return (
    <section className='calendar__wrapper'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        businessHours={true}
        events={[
          { title: 'event 1', start: '2022-05-01' },
          // endに指定した日付は含まないので注意
          { title: 'event 2', start: '2022-05-03', end: '2022-05-05' },
          {
            title: 'event 3',
            start: '2022-05-07',
          },
        ]}
      />
    </section>
  );
};

export default Calendar;
