import React, { useState } from "react";
import { uploadFile } from "../api";

const Upload = () => {
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
        <>
            <div>
                <input type="file" onChange={handleFileUpload} />
                <button onClick={handleUploadClick} disabled={!selectedFile}>
                    Upload
                </button>

                <p>Test Response: {testResponse}</p>
            </div>
        </>
    )
}

export default Upload;
