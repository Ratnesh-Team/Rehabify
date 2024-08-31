

 ![Screenshot 2024-08-31 190300](https://github.com/user-attachments/assets/1b1b3514-183f-42f4-9d28-d33ebb74bb92)

 ## Super Admin Credentials

- **Email**: superadmin@example.com
- **Password**: password@1

## Admin Credentials

- **Email**: admin@gmail.com
- **Password**: 123Qwe1

## User Credentials

- **Email**: user@gmail.com
- **Password**: 123Qwe1
 
# Rehabify - Rehabilitation and Nasha Mukti Kendra Management Platform

## Overview

Rehabify is a comprehensive management platform designed for rehabilitation and Nasha Mukti Kendra centers. The platform allows Nasha Mukti Kendra admins to register, doctors to register, and users to search for the nearest Nasha Mukti Kendra. Additionally, a super admin can approve registrations and manage the platform.

## Features

- **Admin Registration**: Nasha Mukti Kendra admins can register and manage their centers.
- **Doctor Registration**: Doctors can register and be associated with specific centers.
- **User Search**: Users can search for the nearest Nasha Mukti Kendra.
- **Super Admin Approval**: Super admin can approve registrations and manage the platform.
- **Authentication**: Secure login for super admin, admin, and users.

## Project Structure

- **Backend**: Built with Go and MongoDB.
- **Frontend**: Built with React and TypeScript.

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
    ```bash
    https://github.com/Ratnesh-Team/Rehabify.git
    cd Rehabify/Backend
    ```

2. **Install dependencies**:
    ```bash
    go mod tidy
    ```

3. **Set up MongoDB**:
   Create a `.env` file in the `Backend` directory and add the following environment variables:
    ```env
    MONGOURI= your mongo url
    ```

4. **Run the backend server**:
    ```bash
    go run main.go
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../Frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend server**:
    ```bash
    npm start
    ```

## Usage

1. **Access the platform**:
    - Open your browser and navigate to `http://localhost:5173` for the frontend.
    - The backend server runs on `http://localhost:3000`.

2. **Login as Super Admin**:
    - Use the provided super admin credentials to log in and manage the platform.

3. **Search for Nasha Mukti Kendra**:
    - Use the search functionality to find the nearest centers.

## Contributing

We welcome contributions! Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.


