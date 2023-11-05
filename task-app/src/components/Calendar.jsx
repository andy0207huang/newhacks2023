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
import { gapi } from "gapi-script";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

let pageToken = null;

function listCalendarEntries() {
  gapi.client.calendar.calendarList
    .list({
      pageToken: pageToken,
    })
    .then((response) => {
      const calendarList = response.result;
      console.log(calendarList.items[0].id);
      return calendarList.items[0].id;
    });
}

class CalendarIntegration extends Component {
  state = {
    events: [],
    isSignedIn: false,
    calendarId: null, // Added calendarId state to store the calendar ID
  };

  componentDidMount() {
    // Load the Google API Client Library and initialize
    gapi.load("client:auth2", this.initClient);
  }

  initClient = () => {
    gapi.client
      .init({
        apiKey: "AIzaSyCw2ejQz3DQoXmpKeG269e-1TMAP57YBmw", // Replace with your API key
        clientId:
          "261810734464-cftl1m5mi5nqpfsagmn09h09cg152tc1.apps.googleusercontent.com", // Replace with your client ID
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
      this.fetchCalendarId(); // Fetch the calendar ID after signing in
      this.fetchCalendarEvents();
    }
  };

  fetchCalendarId = () => {
    // Fetch the calendar ID of the user's primary calendar
    gapi.client.calendar.calendarList
      .list()
      .then((response) => {
        const primaryCalendar = response.result.items.find(
          (calendar) => calendar.primary
        );
        if (primaryCalendar) {
          this.setState({ calendarId: primaryCalendar.id });
        }
      })
      .catch((error) => {
        console.error("Error fetching calendar ID:", error);
      });
  };

  fetchCalendarEvents = () => {
    const { calendarId } = this.state;
    if (calendarId) {
      // Fetch calendar events for the user's primary calendar
      gapi.client.calendar.events
        .list({
          calendarId: calendarId,
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
    }
  };

  render() {
    const { isSignedIn } = this.state;

    return (
      <div>
        {isSignedIn ? (
          <div>
            <h2>Your Embedded Google Calendar:</h2>
            <iframe
              src={`https://calendar.google.com/calendar/embed?src=${listCalendarEntries}`}
              title="Embedded Google Calendar"
              style={{ border: "0", width: "800px", height: "600px" }}
            ></iframe>
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
