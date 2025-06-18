import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.responses.create({
  prompt: {
    "id": "pmpt_68531bf0d87c8194825f54a04eb0af700cf15457c5deefbe",
    "version": "2"
  },
  input: [],
  reasoning: {},
  tools: [
    {
      "type": "web_search_preview",
      "search_context_size": "medium",
      "user_location": {
        "type": "approximate",
        "city": null,
        "country": null,
        "region": null,
        "timezone": null
      }
    },
    {
      "type": "code_interpreter",
      "container": {
        "type": "auto"
      }
    },
    {
      "type": "image_generation",
      "background": "auto",
      "moderation": "auto",
      "output_compression": 100,
      "output_format": "png",
      "quality": "high",
      "size": "auto"
    }
  ],
  max_output_tokens: 2048,
  store: true
});
