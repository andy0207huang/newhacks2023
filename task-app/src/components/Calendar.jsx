import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Calendarjfg() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar-container">
      <iframe
        src="https://embed.styledcalendar.com/#LkGMOk5NB7mv2ULOHIOV"
        title="Styled Calendar"
        class="styled-calendar-container"
        data-cy="calendar-embed-iframe"
      ></iframe>
      <script
        async
        type="module"
        src="https://embed.styledcalendar.com/assets/parent-window.js"
      ></script>
    </div>
  );
}
