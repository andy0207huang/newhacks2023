// import React from "react";
// import { GoogleLogin } from "react-google-login";
// import "../index.css";
// import axios from "axios";

// export default function AuthButton() {
//   const responseGoogle = (response) => {
//     console.log(response);
//     const { code } = response;
//     axios
//       .post("/api/create-tokens", { code })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => console.log(error.message));
//   };
//   const responseError = (response) => console.log(error);

//   return (
//     <div>
//       <GoogleLogin
//         className="auth-btn"
//         clientId="261810734464-cftl1m5mi5nqpfsagmn09h09cg152tc1.apps.googleusercontent.com"
//         buttonText="Sign In & Authenticate Calendar"
//         onSuccess={responseGoogle}
//         onFailure={responseError}
//         cookiePolicy={"single_host_origin"}
//         responseType="code"
//         accessType="offline"
//         scope="openid email profile https://www.googleapis.com/auth/calendar"
//       />
//     </div>
//   );
// }

import React, { Component } from "react";
import { gapi } from "gapi-script";

class CalendarIntegration extends Component {
  state = {
    isSignedIn: false,
    events: [],
  };

  async componentDidMount() {
    // Load the Google API Client Library and initialize it
    await gapi.load("client:auth2", this.initClient);
  }

  initClient = async () => {
    try {
      await gapi.client.init({
        apiKey: "AIzaSyCw2ejQz3DQoXmpKeG269e-1TMAP57YBmw",
        clientId:
          "261810734464-cftl1m5mi5nqpfsagmn09h09cg152tc1.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      });

      // Listen for sign-in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (error) {
      console.error("Error initializing the Google API client:", error);
    }
  };

  updateSigninStatus = (isSignedIn) => {
    this.setState({ isSignedIn });

    if (isSignedIn) {
      this.fetchCalendarEvents();
    }
  };

  fetchCalendarEvents = () => {
    // Fetch and display calendar events here
    // You can use gapi.client.calendar.events.list()
    // to retrieve events from the user's calendar.
  };

  render() {
    const { isSignedIn, events } = this.state;

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
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
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
