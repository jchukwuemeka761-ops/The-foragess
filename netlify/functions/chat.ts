import { GoogleGenAI } from '@google/genai';

interface ChatRequestBody {
  message?: string;
  history?: Array<{ role: 'user' | 'model'; text: string }>;
  menuContext?: string;
}

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const payload: ChatRequestBody = event.body ? JSON.parse(event.body) : {};
    const userQuery = payload.message || '';
    const menuContext = payload.menuContext || '';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reply: `Welcome to Naveda World Bites And Brews! 🌟 We are located at Okwuta Road by Ahiaeke Junction, Umuahia, Abia State. Open 24 Hours Daily. You can reach our front desk directly at +234 903 977 7679 on WhatsApp or phone call.`
        })
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the friendly, polite, and helpful 24/7 AI Customer Assistant for "Naveda World Bites And Brews", the premier landmark hospitality resort located at Okwuta Road by Ahiaeke Junction, Umuahia, Abia State, Nigeria.

Resort Key Details:
- Hours: OPEN 24 HOURS DAILY, 7 DAYS A WEEK.
- Phone & WhatsApp: +234 903 977 7679.
- Features: 
  * Luxury Dining Restaurant with 38 authentic Pan-African culinary creations (Eastern native soups like Oha, Bitterleaf, White Soup, Afang, Ofe Achara with Akpuru-akpu; mains like Jollof Rice, Seafood Fried Rice, Peppered Goat Meat, Grilled Croaker Fish).
  * VIP Bar & Nightlife: Premium champagne (Dom Pérignon, Ace of Spades, Moët, Veuve Clicquot), Hennessy XO, Hennessy VSOP, Casamigos, Don Julio 1942, cocktails, chilled beers.
  * Live Highlife Band: Every Friday, Saturday, and Sunday night featuring authentic Eastern highlife artists on stage.
  * Champions Billiards & Snooker Lounge (tournament grade tables).
  * The Arena: All-Weather 5-A-Side AstroTurf Pitch (Floodlit night matches & daylight slots).
  * Naveda Mart: 24/7 supermarket & convenience mall.
  * Prices are in Nigerian Naira (₦).

Live Context from Admin Menu:
${menuContext}

Guidelines:
- Keep responses concise, warm, inviting, and hospitable.
- Use Nigerian Naira (₦) formatting for all prices.
- When guests ask to book turf or place orders, invite them to use WhatsApp (+234 903 977 7679) or the booking button.
- Answer accurately based on the context. If unsure of an item, recommend chatting with our WhatsApp desk.`;

    const contents = [];
    if (payload.history && payload.history.length > 0) {
      for (const h of payload.history) {
        contents.push({
          role: h.role,
          parts: [{ text: h.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: userQuery }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction
      }
    });

    const reply = response.text || 'Thank you for reaching out to Naveda World Bites And Brews! How else may I assist you?';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reply: `Thank you for contacting Naveda World! We are open 24 hours daily at Okwuta Road by Ahiaeke Junction, Umuahia. Feel free to contact our team directly on WhatsApp (+234 903 977 7679).`
      })
    };
  }
};
