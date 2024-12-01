# Grok Chat App

A React-based chat application that integrates with the Grok AI model through x.ai's API.
![image](https://github.com/user-attachments/assets/15c3f74f-4e74-4bd5-bf40-e42ed1f3f78f)

## Features

- Real-time chat interface with Grok AI
- Multiple chat sessions support with titles based on first message
- Persistent chat history using localStorage
- Markdown support in messages with code block highlighting
- Responsive design with styled-components
- Dark/Light theme toggle
- Mobile-friendly sidebar navigation
- Settings management for API key configuration

## Prerequisites

Before running this application, you'll need:

- Node.js (v18 or higher)
- npm or yarn
- A valid API key from x.ai (Grok)

## Environment Setup

1. Clone the repository
2. Create a `.env` file in the root directory
3. Add your x.ai API key:

REACT_APP_GROK_API_KEY=your_api_key_here

Alternatively, you can set your API key through the settings interface in the app.

## Installation

In the project directory, run:
### `npm install`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
The build is minified and optimized for best performance.

## Key Features

- **Chat Management**: Create, switch between, and delete chat sessions
- **Persistent Storage**: Chat history is saved in localStorage
- **Responsive Design**: Works on both desktop and mobile devices
- **Theme Support**: Toggle between light and dark themes
- **API Key Management**: Set and update your x.ai API key through the settings interface
- **Markdown Support**: Rich text formatting and code syntax highlighting