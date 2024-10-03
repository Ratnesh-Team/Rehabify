

# Rehabify - Rehabilitation and Nasha Mukti Kendra Management Platform
![Rehabify Screenshot](https://github.com/user-attachments/assets/1b1b3514-183f-42f4-9d28-d33ebb74bb92)

## Overview

Rehabify is a comprehensive platform designed to streamline the management of rehabilitation and Nasha Mukti Kendra centers. The platform offers features such as admin registration, doctor registration, and a user-friendly search function for locating the nearest Nasha Mukti Kendra. The platform is overseen by a super admin, who approves registrations and manages the system.

## Key Features

- **Admin Registration**: Admins of Nasha Mukti Kendra centers can register and manage their centers.
- **Doctor Registration**: Doctors can register and associate themselves with specific centers.
- **User Search**: Users can search for nearby Nasha Mukti Kendra centers.
- **Super Admin Control**: Super admin approves center registrations and manages the platform.
- **Secure Authentication**: Role-based authentication for super admin, admin, and users.

## Credentials

- **Super Admin Credentials**:
  - **Email**: superadmin@gmail.com
  - **Password**: password@1

- **Admin Credentials**:
  - **Email**: admin@gmail.com
  - **Password**: 123Qwe1

- **User Credentials**:
  - **Email**: user@gmail.com
  - **Password**: 123Qwe1

## Project Structure

- **Backend**: Built with Go and MongoDB.
- **Frontend**: Built with React and TypeScript.

---

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Ratnesh-Team/Rehabify.git
    cd Rehabify/Backend
    ```

2. **Install dependencies**:
    ```bash
    go mod tidy
    ```

3. **Set up MongoDB**:
    - Create a `.env` file in the `Backend` directory with the following content:
    ```env
    MONGOURI=your-mongo-url
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

---

## Usage

1. **Access the platform**:
    - Frontend: Navigate to `http://localhost:5173`.
    - Backend: The server runs on `http://localhost:3000`.

2. **Login**:
    - Use the super admin credentials to manage the platform.
  
3. **Search for a Nasha Mukti Kendra**:
    - Use the search feature to locate nearby centers.

---

## Contributing

We welcome contributions! Please follow these guidelines:

- **Branching**: Ensure you raise a pull request to the `develop` branch.
- **Forking**: Fork the repository, make your changes, and submit a pull request.
- **Code Reviews**: All submissions will undergo code review.

For any issues or suggestions, feel free to create an issue or contact us directly.

---

## License

This project is licensed under the MIT License.
