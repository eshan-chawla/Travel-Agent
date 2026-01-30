
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function chatWithMinimax(messages: Message[]) {
  const apiKey = process.env.MINIMAX_API_KEY;
  const groupId = process.env.MINIMAX_GROUP_ID;

  // Use a default response if keys are missing (for demo)
  if (!apiKey || !groupId) {
    console.warn('Minimax keys missing, returning mock response');
    const lastMsg = messages[messages.length - 1].content.toLowerCase();
    
    if (lastMsg.includes('flight') || lastMsg.includes('china') || lastMsg.includes('beijing')) {
        return `TOOL_CALL: { "tool": "searchFlights", "params": { "fly_from": "SJC", "fly_to": "PEK", "date_from": "20/10/2026", "date_to": "27/10/2026" } }`;
    }
    return "I am the Trae Travel Agent (Mock). Please configure MINIMAX_API_KEY and MINIMAX_GROUP_ID to connect to the real AI.";
  }

  const url = `https://api.minimax.chat/v1/text/chatcompletion_v2?GroupId=${groupId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages: messages.map(m => ({
          sender_type: m.role === 'user' ? 'USER' : 'BOT',
          sender_name: m.role === 'user' ? 'User' : 'Assistant',
          text: m.content,
        })),
        bot_setting: {
            bot_name: "Travel Agent",
            content: "You are a helpful travel agent. You can help users book flights using the Kiwi.com API. If the user asks for flights, you MUST output a specific JSON format to call the tool. Format: TOOL_CALL: { \"tool\": \"searchFlights\", \"params\": { \"fly_from\": \"CODE\", \"fly_to\": \"CODE\", \"date_from\": \"DD/MM/YYYY\", \"date_to\": \"DD/MM/YYYY\" } }."
        },
        reply_constraints: { sender_type: "BOT", sender_name: "Assistant" }
      }),
    });

    if (!response.ok) {
        throw new Error(`Minimax API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || data.reply || ""; 
  } catch (error) {
    console.error('Minimax Error:', error);
    return "Sorry, I am having trouble connecting to my brain (Minimax API).";
  }
}
