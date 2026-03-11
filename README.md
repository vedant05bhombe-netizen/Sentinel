Sentinel – Deepfake & Malicious URL Detector

Sentinel is a React-based frontend application designed to detect deepfake media and malicious URLs.
It provides an intuitive interface where users can upload media for deepfake analysis or submit URLs to check if they are potentially harmful.

The frontend communicates with backend APIs that perform the actual detection.

Features

Deepfake image/video detection interface

Malicious URL detection

Simple and clean UI

Fast API integration

Built using modern frontend technologies

Tech Stack

Frontend Framework

React (Vite)

Languages

JavaScript

CSS

Tools

Vite

ESLint

Project Structure
Sentinel
│
├── public
│
├── src
│   ├── assets            # Images and static assets
│   ├── App.css           # Global app styling
│   ├── App.jsx           # Root React component
│   ├── Deepfake.jsx      # Deepfake detection UI
│   ├── Sentinel.jsx      # Main dashboard/component
│   ├── Url.jsx           # URL detection UI
│   ├── index.css         # Global styles
│   └── main.jsx          # React entry point
│
├── index.html            # Main HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md
Installation

Clone the repository

git clone https://github.com/vedant05bhombe-netizen/Sentinel.git

Navigate into the project directory

cd Sentinel

Install dependencies

npm install
Running the Project

Start the development server

npm run dev

The application will run on

http://localhost:5173
Usage
Deepfake Detection

Navigate to the Deepfake Detector section.

Upload an image or video.

The frontend sends the media to the backend API.

The result indicates whether the media is real or deepfake.

URL Detection

Go to the URL Detector section.

Enter the URL you want to verify.

The system checks the URL against the detection API.

The result shows whether the URL is safe or malicious.

Future Improvements

Add authentication

Display detection confidence scores

Support more media formats

Add real-time scanning

Improve UI/UX

Author

Vedant Bhombe

3rd Year IT Student
Java | Python | React | Spring Boot | PostgreSQL
