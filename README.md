# Campus Navigation System

[![Live Demo](https://img.shields.io/badge/Live_Demo-Campus_Navigation-brightgreen?style=for-the-badge&logo=vercel)](https://campus-navigation-appdiv.vercel.app/)

## Live Application
You can access and explore the live web app here:
 **[Campus Navigation Live App](https://campus-navigation-appdiv.vercel.app/)**

---

## Project Overview

This project is a Campus Navigation System that provides backend APIs along with an interactive frontend interface to manage, explore, and navigate campus locations in real-time. It allows users to search rooms, labs, and buildings, view turn-by-turn routes with voice navigation, and find their way around campus easily.

## Features

* **Live Interactive Map**: Powered by Leaflet & OpenStreetMap
* **Multi-Modal Navigation**: Real-time GPS location tracking, turn-by-turn routing (OSRM), and voice assistant guidance
* **Smart Campus Search**: Quick search and auto-suggestions across blocks, room numbers, and facilities
* **Multi-Level Guidance**: Context-aware floor guidance (ground, 1st, 2nd, 3rd, 4th floors)
* **User Session Management**: Roles for Students, Faculty, and Visitors
* **Cloud Database**: Powered by MongoDB Atlas


## Technologies Used

* Node.js
* Express.js
* MongoDB
* HTML, CSS, JavaScript

## Project Structure

```
CAMPUS NAVIGATION BACKEND/
│
├── frontend/
│   ├── index.html
│   ├── map.html
│   ├── script.js
│   └── style.css
│
├── models/
│   ├── Location.js
│   └── User.js
│
├── routes/
│   ├── locationRoutes.js
│   └── userRoutes.js
│
├── data/
│   └── locations.json
│
├── app.js
├── package.json
├── .gitignore
└── README.md
```


## Prerequisites

Make sure the following are installed on your system:

* Node.js (version 14 or above recommended)
* MongoDB (running locally on port 27017)

## Installation

1. Clone the repository:

git clone https://github.com/Dij06/MinorProject_CampusNavigation_DivyanshiJadon.git

2. Navigate to the project directory:

cd MinorProject_CampusNavigation_DivyanshiJadon

3. Install dependencies:

npm install

The required packages include:

* express
* mongoose
* cors

## Configuration

The application connects to MongoDB using the following URL:

mongodb://127.0.0.1:27017/campus_navigation

Ensure MongoDB is running locally before starting the server.

## Running the Application

Start the backend server:

node app.js

The server runs on:

http://localhost:7000


### Testing the Backend

To verify that the backend is working, open:

http://localhost:7000/hello

You should see a confirmation message from the server.

### Running the Frontend

Open the frontend using Live Server or open the file directly:

frontend/index.html

## API Endpoints

* GET /hello
  Test route to check if the server is running

* /api/locations
  Handles location-related operations

* /api/search
  Provides search functionality for locations

* /api/users
  Handles user-related operations

## Database Setup

Sample data is provided in: `data/locations.json`

To automatically seed the database (local or MongoDB Atlas via `.env`):
```bash
npm run seed
```

Alternatively, to import directly via MongoDB CLI:
```bash
mongoimport --uri="mongodb://127.0.0.1:27017/campus_navigation" --collection=locations --file=data/locations.json --jsonArray
```


## Important Notes

* The `.env` file is not included for security reasons
* `node_modules` is excluded from the repository
* Ensure MongoDB service is running before starting the application

## Authors

* Akansha Tomar 
* Divyanshi Jadon 
* Kashak Gupta
* Laxmi Ojha
