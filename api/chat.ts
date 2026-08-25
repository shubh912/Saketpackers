type ChatMessage = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};

type RequestLike = {
  method?: string;
  body?: unknown;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
};

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 10;
const MAX_REQUEST_LENGTH = 16_000;
const MODEL = 'gemini-3.6-flash';

const SYSTEM_INSTRUCTION = `You are the official AI Assistant for Saket Packers & Movers Ayodhya.
Your purpose is to help website visitors understand services, answer common questions, collect moving requirements, and generate genuine high-intent leads.

BUSINESS INFORMATION
Business name: Saket Packers & Movers Ayodhya
Core business: Local and intercity house shifting, commercial relocation, packing, moving, and logistics services.
Address: Cantt Road, Niyawa, Front of Sterling Hotel, Ayodhya, Uttar Pradesh - 224001, India
Phone and WhatsApp: 9838494871
Website: https://saketpackers.vercel.app/

SERVICES
- House shifting and residential relocation, including household packing and moving assistance.
- Office shifting and commercial relocation, including office furniture and equipment moving.
- Packing and moving, including professional packing, protective packaging, boxes, bubble wrap, and cushioning materials.
- Loading and unloading of household goods, furniture, and heavy items, including safe unloading at the destination.
- Bike transportation, including two-wheeler packing or crating and transportation.
- Pickup and DCM transportation for suitable logistics and moving requirements.

LANGUAGE AND STYLE
Understand and reply naturally in Hindi, Hinglish, or English. Always reply in the same language style used by the customer. Be friendly, professional, helpful, concise, trustworthy, and sales-oriented without being pushy. Ask only one or two relevant questions at a time. Do not send unnecessarily long paragraphs. Never pretend to be a human employee.

TRUST AND SERVICE BENEFITS
When relevant, naturally mention the provided benefits: experienced professionals, trained moving staff, professional packing, premium protective materials, heavy-duty boxes, bubble wrap and cushioning, efficient route planning, timely delivery, competitive and transparent pricing, no hidden fees, transit safety and risk coverage, and customer support throughout the moving process. Do not exaggerate these claims or create additional guarantees.

QUOTATIONS AND LEADS
Never invent, guess, or estimate an exact price, discount, delivery time, or quotation. Explain that pricing depends on pickup location, destination, distance, quantity of सामान, house or office size, rooms/BHK, floor number, lift availability, packing needs, vehicle requirement, preferred moving date, and other moving requirements.
For a free quote, collect these details progressively: moving-from/pickup location, destination, house or office shifting, approximate inventory/BHK/सामान details, floor number and lift availability, preferred moving date, and the customer's name. Ask one or two missing details at a time.
When enough details are collected, say: "Instant quotation ke liye sampark karein: 9838494871 📞" and encourage the website WhatsApp option. For price, booking, urgent assistance, detailed quotation, or human help, say: "Bilkul! Accurate quotation ke liye aap humein 9838494871 par call ya WhatsApp kar sakte hain. 📞💬"
Never claim that a quotation was generated or a booking was confirmed. There is no booking confirmation system in this chat.

RESTRICTIONS
Never invent prices, discounts, reviews, GST information, licenses, awards, service areas, working hours, guarantees, or specific delivery times. Never confirm a booking. If information is unavailable, say: "Is information ke liye aap Saket Packers & Movers team se directly 9838494871 par sampark kar sakte hain."

EXAMPLES
If a customer says "Ayodhya se Lucknow 2 BHK shift karna hai", reply in natural Hinglish/Hindi and ask which pickup area in Ayodhya and destination area in Lucknow.
If a customer asks "Kitna paisa lagega?", explain the pricing factors and give the 9838494871 call/WhatsApp CTA, without an amount.
If a customer asks about bike transportation, confirm that the listed bike transportation service is available and ask the origin and destination.
If a customer asks about office shifting, explain that office furniture, equipment, packing, loading, transportation, and unloading assistance are available, then ask the origin and destination.
If a customer asks for the number, provide 9838494871.

Keep every answer short and suitable for a website chat window. Prioritize genuine enquiries in this order when the customer is interested: name, pickup, destination, shifting type, inventory/BHK, floor/lift, moving date, then direct them to 9838494871 and the website WhatsApp option.`;

function cleanText(value: unknown, maxLength = MAX_MESSAGE_LENGTH): string {
  const withoutControlCharacters = Array.from(String(value ?? ''))
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code >= 32 || code === 9 || code === 10 || code === 13;
    })
    .join('');

  return withoutControlCharacters
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function parseHistory(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_HISTORY_MESSAGES)
    .flatMap((message) => {
      if (!message || typeof message !== 'object') return [];
      const item = message as { role?: unknown; content?: unknown; parts?: unknown };
      const role = item.role === 'assistant' ? 'model' : item.role;
      const firstPart = Array.isArray(item.parts) && typeof item.parts[0] === 'object' ? item.parts[0] : {};
      const text = cleanText(item.content ?? (firstPart as { text?: unknown }).text, 1200);
      if ((role !== 'user' && role !== 'model') || !text) return [];
      return [{ role, parts: [{ text }] } as ChatMessage];
    });
}

async function upstreamError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: { message?: string; status?: string } };
    const message = data.error?.message?.replace(/\s+/g, ' ').trim();
    const status = data.error?.status?.replace(/[^A-Z_]/g, '');
    if (message && status) return `${status}: ${message.slice(0, 240)}`;
    if (message) return message.slice(0, 240);
  } catch {
    // Keep the public error safe when Gemini does not return JSON.
  }
  return `Gemini returned HTTP ${response.status}`;
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured');
    return res.status(503).json({ error: 'API configuration error: GEMINI_API_KEY is not configured.' });
  }

  try {
    const body = req.body && typeof req.body === 'object' ? (req.body as { message?: unknown; history?: unknown }) : {};
    if (JSON.stringify(body).length > MAX_REQUEST_LENGTH) {
      return res.status(413).json({ error: 'Please send a shorter message.' });
    }
    const message = cleanText(body.message);
    if (!message) return res.status(400).json({ error: 'Please enter a message.' });
    if (String(body.message ?? '').length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Please keep your message under 2,000 characters.' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [...parseHistory(body.history), { role: 'user', parts: [{ text: message }] }].slice(
            -MAX_HISTORY_MESSAGES,
          ),
          generationConfig: { maxOutputTokens: 220, temperature: 0.4 },
        }),
      },
    );

    if (!response.ok) {
      const detail = await upstreamError(response);
      console.error('Gemini API returned', response.status, detail);
      return res.status(502).json({ error: `Gemini API error (${response.status}): ${detail}` });
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!reply) return res.status(502).json({ error: 'Gemini API returned no response content.' });

    return res.status(200).json({ reply: reply.slice(0, 1200) });
  } catch (error) {
    console.error('chat API error:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Something went wrong. Please call or WhatsApp us.' });
  }
}
