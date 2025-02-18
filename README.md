

**Code Alpha Project (Task 02)**

# Secure File Transfer Application

## Overview

This project is a **Secure File Transfer Application** designed to provide a secure and reliable way to transfer files over the internet. It leverages a variety of technologies and tools to ensure smooth file transfers with real-time status updates and monitoring. The application is designed for simplicity and security, utilizing a robust back-end infrastructure to handle file uploads, downloads, and user communication.

## Features

- **Real-Time File Transfer**: Upload and download files securely with live progress updates.
- **Secure Communication**: Socket.IO is used for real-time communication and ensuring smooth data transmission.
- **User Interface**: A simple, user-friendly interface built with HTML, CSS, and JavaScript for easy interaction.
- **File Status**: Ongoing, completed, and pending transfers are displayed in the dashboard.
- **MongoDB Integration**: MongoDB is used for managing user data and file transfer records.
- **Postman for Testing**: API endpoints and server functionalities are tested using Postman for accurate communication between client and server.

## Technologies Used

### Frontend:
- **HTML**: Structure and layout of the application.
- **CSS**: Styling the interface for a clean and responsive design.
- **JavaScript**: Handling client-side logic, real-time updates, and AJAX calls for file upload and download.

### Backend:
- **Node.js**: Server-side runtime environment for JavaScript.
- **Socket.IO**: Used for establishing a real-time, bi-directional communication channel between the server and the client.
- **MongoDB**: NoSQL database used to store user information and file transfer data.
- **MongoDB Compass**: GUI for MongoDB used to manage and visualize database records.

### Development Tools:
- **Postman**: API testing tool used to ensure the server's API endpoints are functional and responsive.
- **VS Code**: Code editor used for development and debugging the application.

## Installation

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running (or a MongoDB cloud database if preferred).

### Steps to Set Up Locally

1. **Clone the repository**:
    ```bash
   git clone https://github.com/AmeerHamza8188345/CodeAlpha_Project_SFTA.git

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MongoDB**:
    - If you're using a local MongoDB server, ensure it's running.
    - If you're using MongoDB Atlas (cloud), update the `MONGODB_URI` in the server configuration with your database connection string.

4. **Run the application**:
    ```bash
    npm start
    ```
    This will start the server on the specified port (default: `3000`).

5. **Open the application**:
    Navigate to `http://localhost:3000` in your browser to view the application.

## API Endpoints

The following are the available API endpoints for the file transfer application:

### 1. Upload File
- **Endpoint**: `POST /upload`
- **Description**: Upload a file to the server.
- **Request Body**: `form-data` containing the file to be uploaded.
- **Response**: Returns a JSON object with the status and progress.

### 2. Get Transfer Status
- **Endpoint**: `GET /status`
- **Description**: Get the status of ongoing transfers.
- **Response**: Returns the current status of all transfers (ongoing, completed, pending).

### 3. Download File
- **Endpoint**: `GET /download/:fileId`
- **Description**: Download a previously uploaded file.
- **Response**: Initiates file download.

## Testing with Postman

1. **Start the server** and open Postman.
2. **Upload a file** using the `POST /upload` endpoint.
3. **Monitor transfer progress** with the `GET /status` endpoint.
4. **Test file download** using the `GET /download/:fileId` endpoint.

