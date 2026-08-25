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
const MODEL = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `You are the official AI assistant for Saket Packers & Movers, Ayodhya.
Website: https://saketpackers.vercel.app/
Services: household shifting, office shifting, packing, loading/unloading, local and intercity shifting, transportation, and packing and moving assistance.
Understand and reply in English, Hindi, or Hinglish. Be friendly, professional, and concise for a website chat window.
Never invent prices, reviews, GST details, licenses, addresses, working hours, guarantees, or bookings. Never confirm a booking unless a real booking system confirms it.
If exact pricing is unknown, explain that the quotation depends on distance, सामान quantity, floors/lift, packing requirements, and other moving details.
For quotation enquiries, ask for: name, pickup location, destination, house/office shifting, approximate BHK/rooms or सामान quantity, floor/lift information, and preferred shifting date.`;

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

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured');
    return res.status(503).json({ error: 'Chat is temporarily unavailable. Please call or WhatsApp us.' });
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
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      console.error('Gemini API returned', response.status);
      return res.status(502).json({ error: 'I could not respond right now. Please call or WhatsApp us.' });
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!reply) return res.status(502).json({ error: 'I could not respond right now. Please call or WhatsApp us.' });

    return res.status(200).json({ reply: reply.slice(0, 1200) });
  } catch (error) {
    console.error('chat API error:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Something went wrong. Please call or WhatsApp us.' });
  }
}
