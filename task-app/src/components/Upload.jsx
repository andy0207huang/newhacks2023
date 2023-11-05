import React, { useState } from "react";
import Modal from "react-modal";
import { PacmanLoader } from "react-spinners";
import { FaCog, FaTrash } from "react-icons/fa";

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

    // delete row from table
    const handleDeleteRow = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            const updatedTableData = [...tableData];
            updatedTableData.splice(index, 1);
            setTableData(updatedTableData);
        }
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
                        <div style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
                            <PacmanLoader size={50} />
                            <p style={{ color: "black" }}>Breaking down your project...</p>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    ) : (
                        <div>
                            {/* title */}
                            <h2 style={{ color: "black" }}>Generated Task List based on your Assignment file</h2>
                            {/* <p style={{ color: "black" }}>{testResponse}</p> */}

                            {/* generated task table */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Deadline</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Task}</td>
                                            <td>{item.Description}</td>
                                            <td>{item.Status}</td>
                                            <td>{item.Deadline}</td>
                                            <td>
                                                <FaCog style={{ marginRight: "10px" }} />
                                                <FaTrash
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDeleteRow(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={closeModal}>Add to Calendar</button>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    )
}

export default Upload;
