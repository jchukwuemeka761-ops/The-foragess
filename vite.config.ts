import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { GoogleGenAI } from '@google/genai';

async function readStreamBody(req: any): Promise<string> {
  if (req.body) {
    return typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }
  if (req.readableEnded) {
    return '';
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function geminiChatPlugin(): Plugin {
  return {
    name: 'gemini-chat-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        try {
          const rawBody = await readStreamBody(req);
          const { message, history, menuContext } = JSON.parse(rawBody || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  reply:
                    'Welcome to Naveda World Bites And Brews! We are located at Okwuta Road by Ahiaeke Junction, Umuahia, and open 24 Hours daily. Our kitchen offers 38 unique Pan-African dishes, all-weather AstroTurf 5-a-side pitch, Champions Billiards lounge, and live highlife music every weekend. How can I assist you with reservations, orders, or inquiries?',
                  isFallback: true
                })
              );
              return;
            }

            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build'
                }
              }
            });

            const systemInstruction = `You are the official 24-hour AI Customer Concierge for Naveda World Bites And Brews in Umuahia, Abia State, Nigeria (Okwuta Road by Ahiaeke Junction). 
Phone / WhatsApp: +234 903 977 7679.
Open 24 Hours every single day.
Features:
- 38+ unique Pan-African and Eastern Nigerian dishes (Ofe Nsala White Soup, Nkwobi in mortar, Ugba oil bean salad, Fisherman Seafood Symphony, Afang, Egusi, Oha, Firewood Jollof, etc.) with prices in Naira (₦).
- The Arena 5-A-Side AstroTurf Pitch (Daylight ₦15,000/hr, Night Floodlit ₦22,000/hr).
- Champions Billiards & Snooker lounge & open-air terrace pool tables with hanging greenery and cold beers.
- Weekend Live Highlife Band on stage in traditional red Igbo caps (Fridays, Saturdays, Sundays).
- VIP bottle service (Moët Rosé ₦145,000, Hennessy X.O ₦320,000, Don Julio 1942 ₦380,000, Johnnie Walker Blue ₦290,000).
- Naveda Mart (Cookware & 24/7 groceries).
${menuContext ? `Current Live Admin Menu & Prices: ${menuContext}` : ''}
Keep answers concise, extremely polite, warm, and helpful. Always quote prices in Naira (₦) and invite guests to place orders or make reservations via WhatsApp (+234 903 977 7679).`;

            const contents: any[] = [];
            if (Array.isArray(history)) {
              for (const h of history) {
                contents.push({
                  role: h.role === 'user' ? 'user' : 'model',
                  parts: [{ text: h.text }]
                });
              }
            }
            contents.push({
              role: 'user',
              parts: [{ text: message }]
            });

            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents,
              config: {
                systemInstruction
              }
            });

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ reply: response.text }));
        } catch (err: any) {
          console.warn('Gemini chat fallback engaged:', err?.message || err);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              reply:
                'Welcome to Naveda World Bites And Brews! 🌟 We are located at Okwuta Road by Ahiaeke Junction, Umuahia, and open 24 Hours daily. Our kitchen offers 38 spectacular dishes, an all-weather 5-a-side AstroTurf arena, Champions Billiards lounge, and live highlife bands every weekend. Feel free to order or reserve directly on WhatsApp (+234 903 977 7679)!'
            })
          );
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), geminiChatPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
