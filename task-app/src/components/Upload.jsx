import React, { useState } from "react";
import Modal from "react-modal";
import { PacmanLoader } from "react-spinners";


import { uploadFile } from "../api";

const Upload = () => {
    // loader
    const [isLoading, setIsLoading] = useState(false);
    // popup
    const [isModalOpen, setIsModalOpen] = useState(false);
    // generated task list table
    const [tableData, setTableData] = useState([]);

    // choose file
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // upload file
    const handleUploadClick = async () => {
        setIsLoading(true);
        setIsModalOpen(true);
        if (selectedFile) {
            try {
                const response = await uploadFile(selectedFile);
                console.log(response.text);
                setTableData(response.text);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // close popup
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
                            {/* title */}
                            <h2 style={{ color: "black" }}>Test Response</h2>
                            {/* <p style={{ color: "black" }}>{testResponse}</p> */}

                            {/* generated task table */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Deadline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Task}</td>
                                            <td>{item.Description}</td>
                                            <td>{item.Status}</td>
                                            <td>{item.Deadline}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <button onClick={closeModal}>Add to Calendar</button>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            </div>
        </>
    )
}

export default Upload;
