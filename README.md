# Grok Chat App

A React-based chat application that integrates with the Grok AI model through x.ai's API.

## Features

- Real-time chat interface with Grok AI
- Multiple chat sessions support
- Persistent chat history using localStorage
- Markdown support in messages
- Responsive design with styled-components

## Prerequisites

Before running this application, you'll need:

- Node.js (v12 or higher)
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

## Project Structure
src/
├── components/ # React components
├── ChatInterface.js # Main chat interface component
├── ChatMessage.js # Individual message component
└── Sidebar.js # Navigation sidebar
├── services/ # API and other services
└── grokApi.js # Grok API integration
├── App.js # Main application component
└── index.js # Application entry point

## Dependencies

- React 18.3.1
- styled-components 6.1.13
- react-markdown 9.0.1
- openai 4.71.1
- axios 1.7.7

## Development

1. Clone the repository:
2. Install dependencies:
3. create a `.env` file in the root directory and add your Grok API key:
REACT_APP_GROK_API_KEY=your_api_key_here
4. Start the development server:
npm start
