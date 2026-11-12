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
            const m = (message || '').toLowerCase();
            let reply = 'Welcome to Naveda World Bites And Brews! We are located at Okwuta Road by Ahiaeke Junction, Umuahia, and open 24 Hours daily. Our kitchen offers 38 unique Pan-African dishes, all-weather AstroTurf 5-a-side pitch, Champions Billiards lounge, and live highlife music every weekend. How can I assist you with reservations, orders, or inquiries?';

            if (m.includes('arabian') || m.includes('tea') || m.includes('dallah') || m.includes('istikana') || m.includes('brew')) {
              reply = '🫖 At Naveda World Bites and Brews, we proudly serve authentic Arabian Tea! Brewed in traditional hand-engraved brass & silver Dallah kettles and poured into gold-filigree Istikana glasses on an ornate brass tray.\n\nVarieties:\n• Royal Cardamom & Saffron Infusion (₦5,000)\n• Maghrebi Fresh Spearmint Pot (₦4,500)\n• Bedouin Spiced Cinnamon Black Tea (₦4,500)\n• Adeni Karak Spiced Milk Tea (₦4,000)\n\nAvailable 24 hours round the clock across our Dining Lounge and Alfresco Terrace!';
            } else if (m.includes('breakfast') || m.includes('morning') || m.includes('asaro') || m.includes('sunrise')) {
              reply = '🌅 Naveda Breakfast Menu (6:00 AM – 11:30 AM & All-Day):\n• Chef Special Sunrise Combo Platter (₦18,000)\n• Traditional Yam Pottage (Asaro) (₦14,000)\n• Slow-Cooked Honey Beans (Ewa Aganyin) (₦18,000)\n• Authentic Eastern Oil Bean Salad (Ugba) (₦11,000)\n• Naveda Signature Royal Pepper Soup (₦12,100)\n\nFreshly prepared from dawn daily with direct table service & delivery!';
            } else if (m.includes('lunch') || m.includes('afternoon') || m.includes('jollof') || m.includes('fried rice')) {
              reply = '☀️ Naveda Lunch Menu (11:30 AM – 4:30 PM):\n• Firewood Smoky Jollof with Jumbo Prawns & Dodo\n• Golden Pan-Fried Rice with Whole Croaker Fish\n• Savory Peanut Groundnut Chicken (₦16,000)\n• Grand Seafood Basket & French Fries (₦29,500)\n• Sautéed Spicy Giant African Snails (₦11,000)\n\nFast table service and quick takeout!';
            } else if (m.includes('dinner') || m.includes('night') || m.includes('clay pot') || m.includes('swallow')) {
              reply = '🌙 Naveda Dinner & Late-Night Menu (4:30 PM – Dawn 24/7):\n• Royal Eastern Oha Soup (Ofe Oha) in Clay Pot (₦18,000)\n• Delta Seafood Banga & Fisherman Soup\n• Rich Egusi & Royal Ogbono Soups with Pounded Yam Swallow\n• Traditional Spicy Nkwobi in Mortar (₦13,200)\n• Steaming Hot Pepper Soup broths round the clock!';
            } else if (m.includes('pitch') || m.includes('turf') || m.includes('football')) {
              reply = '⚽ The Arena 5-A-Side AstroTurf Pitch rates:\n• Daylight Slot (6:00 AM – 6:00 PM): ₦15,000 / hour\n• Night Floodlit Championship Slot (6:00 PM – Late): ₦22,000 / hour\n\nIncludes pro mini goals, perimeter netting, match balls, and floodlights!';
            }

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ reply, isFallback: true }));
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
- Meal Times & Dining Hours:
  * Breakfast Menu (6:00 AM – 11:30 AM & All-Day): Sunrise sharing platters, sweet plantains with egg sauce, native yam pottage (Asaro), honey beans, early morning pepper soup.
  * Lunch Menu (11:30 AM – 4:30 PM): Firewood smoky jollof, fried rice & croaker fish, savory chicken, seafood baskets, peppered snails.
  * Dinner & Late-Night Menu (4:30 PM – Dawn 24/7): Rich native clay-pot soups (Ofe Oha, Egusi, Banga, Ogbono, Bitter Leaf) with pounded yam swallow, slow-cooked Nkwobi in mortar.
- Authentic Arabian Tea Ceremony & Hot Brews:
  * Served in traditional hand-engraved brass long-spout Dallah kettles with gold-filigree Istikana glasses on ornate brass trays.
  * Varieties: Royal Cardamom & Saffron Infusion (₦6,500), Maghrebi Spearmint Gunpowder Tea (₦6,000), Bedouin Spiced Cinnamon (₦5,500), Adeni Karak Chai with Evaporated Milk (₦4,800).
- 38+ unique Pan-African and Eastern Nigerian dishes with prices in Naira (₦).
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
