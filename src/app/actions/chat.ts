
'use server'

import { chatWithMinimax } from '@/lib/minimax';
import { searchFlights } from '@/lib/kiwi';

export async function sendMessage(history: { role: 'user' | 'assistant'; content: string }[], message: string) {
  const messages = [...history, { role: 'user', content: message } as const];

  try {
    let response = await chatWithMinimax(messages);

    // Detect Tool Call
    if (response.includes('TOOL_CALL:')) {
      // Extract JSON from TOOL_CALL
      const match = response.match(/TOOL_CALL: ({.*})/);
      if (match) {
        try {
            const toolCall = JSON.parse(match[1]);
            
            if (toolCall.tool === 'searchFlights') {
                const flights = await searchFlights(toolCall.params);
                
                // Format flight results for the AI
                let summary = "No flights found.";
                if (flights && flights.data && flights.data.length > 0) {
                    summary = flights.data.slice(0, 3).map((f: any) => 
                        `Flight: ${f.flyFrom}->${f.flyTo} | ${f.price} EUR | ${f.airlines.join(',')}`
                    ).join('\n');
                }

                // Recursive call with tool results
                // We fake the tool interaction in the history for the AI
                const toolMessages = [
                    ...messages,
                    { role: 'assistant', content: response } as const,
                    { role: 'user', content: `Tool Output (System): ${summary}` } as const
                ];
                
                // Get final response from AI interpreting the tool output
                response = await chatWithMinimax(toolMessages);
            }
        } catch (e) {
            console.error("Failed to parse tool call", e);
        }
      }
    }
    return { role: 'assistant', content: response };
  } catch (error) {
    console.error(error);
    return { role: 'assistant', content: "I'm having trouble connecting right now." };
  }
}
