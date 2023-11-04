import React, { useState } from "react";
import Calenderjfg from "../components/Calendar";
import AuthButton from "../components/AuthButton";

import logo from "../assets/breakject.ai-s.png";

const Home = () => {
  // upload file
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Send the file to the backend for AI scraping
    // You can make an API request to your backend here
    // and handle the file processing on the server side
  };

  // backend test
  const [testResponse, setTestResponse] = useState("");
  const handleTestClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/test");
      const data = await response.json();
      setTestResponse(data.msg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <img
        src={logo}
        style={{ height: "200px", width: "200px" }}
        alt="breakject.ai Logo"
      />
      <h1>Welcome to breakject.ai!</h1>
      <p>
        Break down your projects and assignments into smaller tasks and
        deadlines for enhanced productivity.
      </p>

      {/* g calendar integration */}
      <AuthButton />
      <Calenderjfg />
      {/* upload */}
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleTestClick} disabled={!selectedFile}>
        Upload
      </button>

      <p>Test Response: {testResponse}</p>
    </div>
  );
};

export default Home;
