import React, { useState } from "react";
import Calenderjfg from "../components/Calendar";
import AuthButton from "../components/AuthButton";

import logo from "../assets/breakject.ai-s.png";
import { uploadFile } from "../api";

const Home = () => {
  // upload file
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // backend test
  const [testResponse, setTestResponse] = useState("");

  const handleUploadClick = async () => {
    if (selectedFile) {
      try {
        const response = await uploadFile(selectedFile);
        console.log(response);
        // Handle the response as needed
        setTestResponse(response.filename);
      } catch (error) {
        console.error(error);
      }
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
      <button onClick={handleUploadClick} disabled={!selectedFile}>
        Upload
      </button>

      <p>Test Response: {testResponse}</p>
    </div>
  );
};

export default Home;
