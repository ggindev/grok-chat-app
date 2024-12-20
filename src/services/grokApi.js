import OpenAI from 'openai';

const getApiKey = () => {
  return localStorage.getItem('grokApiKey') || process.env.REACT_APP_GROK_API_KEY || '';
};

// Create OpenAI instance with configuration
const openai = new OpenAI({
  apiKey: getApiKey(),
  baseURL: 'https://api.x.ai/v1',
  dangerouslyAllowBrowser: true
});

export const sendMessageToGrok = async (message, chatHistory = []) => {
  try {
    if (!getApiKey()) {
      throw new Error('Please set your X API key in settings');
    }

    // Convert chat history to the format expected by the API
    const messages = [
      { role: 'system', content: 'You are Grok, a chatbot inspired by the Hitchhiker\'s Guide to the Galaxy.' },
      ...chatHistory.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      messages: messages,
    });

    return completion.choices[0].message;
  } catch (error) {
    throw new Error(error.message || 'Failed to send message to Grok');
  }
}; 