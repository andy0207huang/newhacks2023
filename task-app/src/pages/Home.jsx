import React, { useState } from "react";
import Calenderjfg from "../components/Calendar";
import AuthButton from "../components/AuthButton";
import Upload from "../components/Upload";

import logo from "../assets/breakject.ai-wname.png";
import { uploadFile } from "../api";
// import TaskList from "../components/TaskList";

const Home = () => {
  // upload file
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  // backend test
  const [testResponse, setTestResponse] = useState("");

  const handleUploadClick = async () => {
    if (selectedFile) {
      try {
        const response = await uploadFile(selectedFile);
        console.log(response);
        // Handle the response as needed
        setTestResponse(response.text);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <img
        src={logo}
        style={{ height: "150px", width: "150px" }}
        alt="breakject.ai Logo"
      />
      <img
        src={logo}
        className="logo"
        style={{ height: "150px", width: "150px" }}
        alt="breakject.ai Logo"
      />
      <h1>Welcome to breakject.ai!</h1>
      <p>
        An AI-integration tool that automatically <b>breaks down</b> your <b>projects</b> and assignments into smaller tasks and
        deadlines to enhance productivity.
      </p>

      {/* g calendar integration */}
      <Upload />
      <AuthButton />
      <Calenderjfg />

      {/* upload
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUploadClick} disabled={!selectedFile}>
        Upload
      </button>
      <p>Test Response: {testResponse}</p> */}
    </div>
  );
};

export default Home;
