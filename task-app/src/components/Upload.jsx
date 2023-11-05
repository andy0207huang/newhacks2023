import React, { useState } from "react";
import Modal from "react-modal";
import { PacmanLoader } from "react-spinners";
import { FaCheck, FaTimes, FaCog, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Select } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
// import dayjs from "dayjs";
// import DatePicker from "@mui/lab/DatePicker";


import { uploadFile, createEvent } from "../api";

const Upload = () => {
    // loader
    const [isLoading, setIsLoading] = useState(false);
    // popup
    const [isModalOpen, setIsModalOpen] = useState(false);
    // generated task list table
    const [tableData, setTableData] = useState([]);
    // edit state task list table
    const [editedTaskList, setEditedTaskList] = useState([]);


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

    // columns
    const handleTaskChange = (index, value) => {
        const updatedTableData = [...tableData];
        updatedTableData[index].Task = value;
        setTableData(updatedTableData);
    };

    const handleDescriptionChange = (index, value) => {
        const updatedTableData = [...tableData];
        updatedTableData[index].Description = value;
        setTableData(updatedTableData);
    };

    const handleStatusChange = (index, value) => {
        const updatedTableData = [...tableData];
        updatedTableData[index].Status = value;
        setTableData(updatedTableData);
    };

    const handleDeadlineChange = (index, date) => {
        const updatedTableData = [...tableData];
        updatedTableData[index].Deadline = String(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
        setTableData(updatedTableData);
    };

    // edit
    const handleSaveRow = (index) => {
        const updatedTableData = [...tableData];
        updatedTableData[index].isEditing = false;
        setTableData(updatedTableData);
    };

    const handleCancelEdit = (index) => {
        const updatedTableData = [...tableData];
        if (updatedTableData[index].isEditing) {
            updatedTableData[index].isEditing = false;
            setTableData(updatedTableData);
        }
    };

    const handleEditRow = (index) => {
        const updatedTableData = [...tableData];
        updatedTableData[index].isEditing = true;
        setTableData(updatedTableData);
    };

    // handle Add to Calendar button click
    const handleAddToCalendar = async () => {
        const finalValues = tableData.map((item) => ({
            Task: item.Task,
            Description: item.Description,
            Status: item.Status,
            Starttime: "November 5, 2023",
            Deadline: item.Deadline
        }));
        console.log(finalValues);
        // setSavedValues(finalValues);

        try {
            const data = await createEvent(finalValues);
            console.log(data.msg);
        } catch (error) {
            console.error(error);
            // Handle error case
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

                <Modal isOpen={isModalOpen} onRequestClose={closeModal}>

                    {isLoading ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <PacmanLoader color="#F39041" size={50} />
                            <p style={{ color: "#F39041" }}>Breaking down your project...</p>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    ) : (
                        <div>
                            {/* title */}
                            <h2 style={{ color: "#F39041" }}>Generated Task List based on your Assignment file</h2>

                            {/* generated task table */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        {/* <th>Start Date</th> */}
                                        <th>Deadline</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            {/* <td>{item.Task}</td> */}
                                            <td>
                                                {item.isEditing ? (
                                                    <TextField
                                                        type="text"
                                                        value={item.Task}
                                                        fullWidth
                                                        label="Task"
                                                        onChange={(e) => handleTaskChange(index, e.target.value)}
                                                        multiline
                                                        maxRows={4}
                                                    />
                                                ) : (
                                                    item.Task
                                                )}
                                            </td>
                                            <td>
                                                {item.isEditing ? (
                                                    <TextField
                                                        type="text"
                                                        value={item.Description}
                                                        fullWidth
                                                        label="Description"
                                                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                                        multiline
                                                        maxRows={4}
                                                    />
                                                ) : (
                                                    item.Description
                                                )}
                                            </td>
                                            <td>
                                                {item.isEditing ? (
                                                    // <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <Select
                                                        value={item.Status}
                                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                                    >
                                                        <MenuItem value="Not Started">Not Started</MenuItem>
                                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                                        <MenuItem value="Completed">Completed</MenuItem>
                                                    </Select>
                                                    // </FormControl>
                                                ) : (
                                                    item.Status
                                                )}
                                            </td>
                                            <td>
                                                {item.isEditing ? (
                                                    <DatePicker
                                                        selected={new Date(item.Deadline)}
                                                        // value = {dayjs(item.Deadline)}
                                                        onChange={(date) => handleDeadlineChange(index, date)}
                                                        dateFormat="MMMM d, yyyy"
                                                    />
                                                ) : (
                                                    item.Deadline
                                                )}
                                            </td>
                                            <td>
                                                {item.isEditing ? (
                                                    <>
                                                        <FaCheck
                                                            style={{ marginRight: "10px", cursor: "pointer", color: "green" }}
                                                            onClick={() => handleSaveRow(index)}
                                                        />
                                                        <FaTimes
                                                            style={{ cursor: "pointer", color: "red" }}
                                                            onClick={() => handleCancelEdit(index)}
                                                        />
                                                    </>
                                                ) : (
                                                    <FaCog
                                                        style={{ marginRight: "10px", cursor: "pointer", color: "gray" }}
                                                        onClick={() => handleEditRow(index)}
                                                    />
                                                )}
                                                <FaTrash
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDeleteRow(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={handleAddToCalendar}>Add to Calendar</button>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    )
}

export default Upload;
