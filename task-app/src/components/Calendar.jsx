import React, { Component, useState } from "react";
import "../index.css";

export default function Calendarjfg() {
  const [url, setUrl] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any necessary validation or processing here.
    // Set the final URL to display in the iframe.
    alert(`The URL you submitted was ${url}`);
    setFormSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="cal-url-form">
        <label>
          Enter your calendar URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="cal-url"
          />
        </label>
        <input type="submit" />
      </form>
      {formSubmitted && url ? ( // Render iframe only when form is submitted
        <iframe
          src={url}
          title="Styled Calendar"
          className="styled-calendar-container"
          style={{ width: "100%", border: "none", height: "400px" }}
          data-cy="calendar-embed-iframe"
        ></iframe>
      ) : null}
    </div>
  );
}
