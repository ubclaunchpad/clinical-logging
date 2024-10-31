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
├── assets                # assets such as logos, marketing materials, transcription pages, provided to us by Flowleaflets. Please keep them here instead of the `public` folder in frontend
├── backend                  
│   ├── routes             # most of the backend code for API routes should be here
│   ├── ├── ...
│   ├── index.js           # Code for running the server and some basic routes
│   ├── package.json             
│   ├── package_lock.json
│   ├── .env.example         #example env file          
│   └── .gitignore             
└──
├── frontend             
│   ├── src
│   ├── ├── assets
│   ├── ├── ├── ...
│   ├── ├── pages         # frontend code for each page should go here
│   ├── ├── ├── ...
│   ├── ├── utils         # put util or helper functions that are shared across multiple files here (eg: protectedRoutes)
│   ├── ├── ├── ...
│   ├── ├── App.jsx         # Main component of the app, likely do not need to modify this
│   ├── ├── App.css         # Styles for App.jsx, likely do not need to modify this
│   ├── ├── index.css         # global css styles go here
│   ├── ├── main.jsx         # root layout of app, wrap all pages inside it
│   ├── public             # Use assets folder instead of this one for logos and visual assets
│   ├── ├── ...
│   ├── package.json             
│   ├── package_lock.json
│   ├── other config files
│   ├── .env.example         #example env file
│   └── .gitignore  
└──
├── transcription         # All code related to the transcription models should be here
│   ├── requirements.txt         # list of required python packages
│   └── testing.py         # run Microsoft Florence 2 model on a test file
└──
```
# Setup
- Install Node.js and npm
- Install Python version 3.12 or later
- Clone the repository

## Backend - Node.js
1. 'cd backend' to change directory to backend folder
2. 'npm install' to install dependencies
3. 'npm run dev' to run local development server

#### .env file
1. Create a new `.env` file in the backend directory, where the `.env.example` file is located.
2. Copy the contents of the `.env.example` file
3. Fill in with the correct credentials
   
## Frontend - React + Vite
1. 'cd frontend' to change directory to frontend folder
2. 'npm install' to install dependencies
3. 'npm run dev' to run local development server

#### .env file
1. Create a new `.env` file in the frontend directory, where the `.env.example` file is located.
2. Copy the contents of the `.env.example` file
3. Fill in with the correct credentials

## Transcription - Python
1. `cd transcription` to change directory to transcription folder
2. `pip install -r "requirements.txt"` to install required packages
3. `python testing.py` or `python3 testing.py` to run the script

NOTE: These packages are in the `requirements.txt` file, but if you get an error telling you to install einops or timm, use `pip install einops timm` to install einops and timm seperately.
