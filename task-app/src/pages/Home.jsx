import React, { useState } from 'react';
import Calenderjfg from "../components/Calendar";
import logo from '../assets/breakject.ai-s.png';

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // Send the file to the backend for AI scraping
        // You can make an API request to your backend here
        // and handle the file processing on the server side
    };

    return (
        <div>
            <img src={logo} style={{ height: '200px', width: '200px' }} alt="breakject.ai Logo" />
            <h1>Welcome to breakject.ai!</h1>
            <p>Break down your projects and assignments into smaller tasks and deadlines for enhanced productivity.</p>

            {/* g calendar integration */}
            <Calenderjfg />

            {/* upload */}
            <input type="file" onChange={handleFileUpload} />
            <button disabled={!selectedFile}>Upload</button>

        </div>
    );
};

export default Home;