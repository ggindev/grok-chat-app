# Grok Chat App

A React-based chat application that integrates with the Grok AI model through x.ai's API.

## Features

- Real-time chat interface with Grok AI
- Multiple chat sessions support with titles based on first message
- Persistent chat history using localStorage
- Markdown support in messages with code block highlighting
- Responsive design with styled-components
- Dark/Light theme toggle
- Mobile-friendly sidebar navigation

## Prerequisites

Before running this application, you'll need:

- Node.js (v18 or higher)
- npm or yarn
- A valid Grok API key from x.ai

## Environment Setup

Create a `.env` file in the root directory and add your Grok API key:

REACT_APP_GROK_API_KEY=your_api_key_here

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
- **Responsive Design**: Fully functional on both desktop and mobile devices
- **Theme Support**: Toggle between light and dark themes
- **Message Formatting**: Full markdown support including code blocks
- **Persistent Storage**: Chat history saved to localStorage
- **Error Handling**: Graceful error handling for API failures