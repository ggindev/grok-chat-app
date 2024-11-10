import OpenAI from 'openai';

// Create OpenAI instance with configuration
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_GROK_API_KEY || '',
  baseURL: 'https://api.x.ai/v1',
  dangerouslyAllowBrowser: true
});

export const sendMessageToGrok = async (message) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      messages: [
        { role: 'system', content: 'You are Grok, a chatbot inspired by the Hitchhiker\'s Guide to the Galaxy.' },
        { role: 'user', content: message }
      ],
    });

    return completion.choices[0].message;
  } catch (error) {
    throw new Error(error.message || 'Failed to send message to Grok');
  }
}; 