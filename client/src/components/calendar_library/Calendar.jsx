// import React from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';

// import './Calendar.scss';

// const Calendar = () => {
//   const addEvent = (e) => {
//     console.log(e);
//   };

//   return (
//     <section className='calendar__wrapper'>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView='dayGridMonth'
//         events={[
//           { title: 'event 1', start: '2022-05-01' },
//           { title: 'event 1-2', start: '2022-05-01' },
//           { title: 'event 1-3', start: '2022-05-01' },
//           { title: 'event 1-4', start: '2022-05-01' },
//           { title: 'event 2', start: '2022-05-03', end: '2022-05-05' },
//           {
//             title: 'event 3',
//             start: '2022-05-07',
//           },
//         ]}
//         selectable='true'
//         dateClick={(e) => {
//           addEvent(e);
//         }}
//       />
//     </section>
//   );
// };

// export default Calendar;
