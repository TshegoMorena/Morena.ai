import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY environment variable is not set!");
  throw new Error("OPENAI_API_KEY is required. Please add your OpenAI API key to the secrets.");
}

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

export interface ChatResponse {
  content: string;
  language: string;
}

const languageNames: Record<string, string> = {
  'en': 'English',
  'zu': 'isiZulu',
  'xh': 'isiXhosa', 
  'af': 'Afrikaans',
  'nso': 'Sepedi',
  'tn': 'Setswana',
  'st': 'Sesotho',
  'ts': 'Xitsonga',
  'ss': 'siSwati',
  've': 'Tshivenda',
  'nr': 'isiNdebele'
};

export async function generateAIResponse(
  userMessage: string,
  language: string = 'en',
  conversationHistory: Array<{ content: string; isUser: boolean }> = []
): Promise<ChatResponse> {
  try {
    const languageName = languageNames[language] || 'English';
    
    const systemPrompt = `You are MORENA, a helpful AI assistant with deep understanding of South African culture and languages. You have universal knowledge and can answer questions about any topic in the world.

IMPORTANT: Always respond in ${languageName}. If the user asks in a different language, respond in ${languageName} unless they specifically request a different language.

You are knowledgeable about:
- South African culture, history, and traditions
- All 11 official South African languages
- Universal topics including science, technology, arts, literature, current events
- Local South African context and global perspectives

Be helpful, respectful, and culturally aware. Provide accurate and informative responses while maintaining a warm, welcoming tone that reflects South African ubuntu philosophy.`;

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      });
    });

    // Add current user message
    messages.push({ role: "user", content: userMessage });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";

    return {
      content,
      language
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate AI response. Please check your API key and try again.");
  }
}
