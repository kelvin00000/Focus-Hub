const { onCall } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require('node-fetch');
const { setGlobalOptions } = require('firebase-functions/v2');


setGlobalOptions({cors: true, region: 'us-central1'});
const geminiKey = defineSecret("GEMINI_API_KEY");
const braveApiKey = defineSecret('BRAVE_API_KEY');


exports.braveSearch = onCall(
  { secrets: [braveApiKey], cors: true },
  async (request) => {
    try {
      const { query } = request.data;

      const response = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Accept': 'application/json',
            'X-Subscription-Token': braveApiKey.value()
          }
        }
      );

      const data = await response.json();
      return data;
    } catch(error) {
      console.error('Brave Search error:', error);
      throw error;
    }
  }
);



exports.aiSearch = onCall(
  { secrets: [geminiKey], cors: true },
  async (request) => {
    try {
      const { prompt } = request.data;

      const genAI = new GoogleGenerativeAI(geminiKey.value());
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      return { text: result.response.text() };
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
);
