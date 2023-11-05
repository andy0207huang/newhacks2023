import React from "react";
import "../index.css";

export default function TaskList() {
  const tasks = [
    {
      description: "Read lab instructions",
      status: "Not Started",
      deadline: "November 4th, 2023",
    },
    {
      description: "Understand lab objectives",
      status: "Not Started",
      deadline: "November 4th, 2023",
    },
    {
      description: "Research multi-threaded socket programming",
      status: "Not Started",
      deadline: "November 7th, 2023",
    },
    {
      description: "Review SocketServer and Socket class documentation",
      status: "Not Started",
      deadline: "November 7th, 2023",
    },
    {
      description: "Research Thread class and its extension",
      status: "Not Started",
      deadline: "November 10th, 2023",
    },
    {
      description: "Design the multi-threaded application",
      status: "Not Started",
      deadline: "November 10th, 2023",
    },
    {
      description: "Implement the multi-threaded application",
      status: "Not Started",
      deadline: "November 20th, 2023",
    },
    {
      description: "Test and debug the application",
      status: "Not Started",
      deadline: "November 25th, 2023",
    },
    {
      description: "Write lab report",
      status: "Not Started",
      deadline: "November 28th, 2023",
    },
    {
      description: "Review lab report and make necessary edits",
      status: "Not Started",
      deadline: "November 29th, 2023",
    },
    {
      description: "Submit lab report",
      status: "Not Started",
      deadline: "November 30th, 2023",
    },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
