# clinical-logging
Clinical logging platform to scan, digitize and store information from handwritten case records from [Flowleaflets](https://flowleaflets.org/) clinical logbooks.

Our app will have the following components:
- Frontend
    - Pages:
        - Login
        - Signup
        - Home
        - Logs
        - Add photo
- Backend
- Database
- Transcription

### Project Structure
```
├── assets
├── backend                  
│   ├── routes             # most of the backend code for API routes should be here
│   ├── ├── ...
│   ├── index.js           # Code for running the server and some basic routes
│   ├── package.json             
│   ├── package_lock.json          
│   └── .gitignore             
└──
├── frontend             
│   ├── src
│   ├── ├── assets
│   ├── ├── ├── ...
│   ├── ├── pages #frontend code for each page should go here
│   ├── ├── ├── ...
│   ├── ├── utils #put util or helper functions that are shared across multiple files here (eg: protectedRoutes)
│   ├── ├── ├── ...
│   ├── ├── App.jsx #Main component of the app, likely do not need to modify this
│   ├── ├── App.css #Styles for App.jsx, likely do not need to modify this
│   ├── ├── index.css #global css styles go here
│   ├── ├── main.jsx #root layout of app, wrap all pages inside it
│   ├── public #put any assets (logos, images) that need to be easily accessed in the app here
│   ├── ├── ...
│   ├── package.json             
│   ├── package_lock.json
│   ├── other config files
│   └── .gitignore  
└──
```
# Setup
- Install Node.js and npm
- Clone the repository

## Backend - Node.js
1. 'cd backend' to change directory to backend folder
2. 'npm install' to install dependencies
3. 'npm run dev' to run local development server

## Frontend - React + Vite
1. 'cd frontend' to change directory to frontend folder
2. 'npm install' to install dependencies
3. 'npm run dev' to run local development server
