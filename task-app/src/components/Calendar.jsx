// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// export default function Calendarjfg() {
//   return (
//     <div className="calendar-container">
//       <iframe
//         src="https://embed.styledcalendar.com/#LkGMOk5NB7mv2ULOHIOV"
//         title="Styled Calendar"
//         className="styled-calendar-container"
//         style={{ width: "100%", border: "none", height: "400px" }}
//         data-cy="calendar-embed-iframe"
//       ></iframe>
//       <script
//         async
//         type="module"
//         src="https://embed.styledcalendar.com/assets/parent-window.js"
//       ></script>
//     </div>
//   );
// }

import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

class CalendarIntegration extends Component {
  state = {
    events: [],
    isSignedIn: false,
  };

  componentDidMount() {
    // Load the Google API Client Library and initialize
    gapi.load("client:auth2", this.initClient);
  }

  initClient = () => {
    gapi.client
      .init({
        apiKey: "AIzaSyDPhy4N3NwjXPfLQYZo963BVHF6Z2qsOsg",
        clientId:
          "261810734464-cftl1m5mi5nqpfsagmn09h09cg152tc1.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      })
      .then(() => {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch((error) => {
        console.error("Error initializing the Google API client:", error);
      });
  };

  updateSigninStatus = (isSignedIn) => {
    this.setState({ isSignedIn });

    if (isSignedIn) {
      this.fetchCalendarEvents();
    }
  };

  fetchCalendarEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary", // Use 'primary' for the user's primary calendar
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        this.setState({ events });
      })
      .catch((error) => {
        console.error("Error fetching calendar events:", error);
      });
  };

  render() {
    const { events, isSignedIn } = this.state;

    return (
      <div>
        {isSignedIn ? (
          <div>
            <h2>Your Calendar Events:</h2>
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  {event.summary} - {event.start.dateTime}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p>Sign in with your Google account to view calendar events.</p>
            <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>
              Sign In
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CalendarIntegration;
