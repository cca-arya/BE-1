// This is a mock service that simulates the response time of the LLM

async function getLLMResponse(prompt) {
    return new Promise((resolve) => {
      const timeout = Math.random() * (15000 - 5000) + 5000;
      setTimeout(() => {
        resolve('This is a mock response from the LLM based on user input');
      }, timeout);
    });
  }
  
  module.exports = { getLLMResponse };
  