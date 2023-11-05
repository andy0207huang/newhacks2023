import React, { useState } from "react";
import Modal from "react-modal";
import { PacmanLoader } from "react-spinners";


import { uploadFile } from "../api";

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // backend test
    const [testResponse, setTestResponse] = useState("");
    const handleUploadClick = async () => {
        setIsLoading(true);
        setIsModalOpen(true);
        if (selectedFile) {
            try {
                const response = await uploadFile(selectedFile);
                console.log(response);
                // Handle the response as needed
                setTestResponse(response.filename);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div>
                <input type="file" onChange={handleFileUpload} />
                {/* <PacmanLoader size={50} /> */}
                <button onClick={handleUploadClick} disabled={!selectedFile}>
                    Upload
                </button>

                {/* <p>Test Response: {testResponse}</p> */}

                <Modal isOpen={isModalOpen} onRequestClose={closeModal}>

                    {isLoading ? (
                        <div>
                            <PacmanLoader size={50} />
                            <p style={{ color: "black" }}>Breaking down...</p>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ color: "black" }}>Test Response</h2>
                            <p style={{ color: "black" }}>{testResponse}</p>
                        </div>
                    )}
                    <button onClick={closeModal}>Close</button>
                </Modal>
            </div>
        </>
    )
}

export default Upload;
