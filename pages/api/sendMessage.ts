/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
);

const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

// 🔁 Replace with the actual hosted URL of your PDF (public access)
const pdfPublicUrl = 'https://gti-trainingproject.vercel.app/StartUpWithCapEasy.pdf';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phoneNumbers, username } = req.body;

  if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
    return res.status(400).json({ error: 'phoneNumbers array is required' });
  }

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'username is required' });
  }

  const messageTemplate = (name: string) => `Hello ${name}!

Thank you for showing interest in DPIIT's #StartUpIndia Certificate 📜

It is truly one of the best tools our government has provided to StartUps to give them a head-start in their business journey. You can see the presentation attached.

PFA CapEasy's other services below:`;

console.log("✅ SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("✅ Token Exists:", !!process.env.TWILIO_AUTH_TOKEN);
console.log("✅ From Number:", fromWhatsAppNumber);


  try {
    for (const phone of phoneNumbers) {
      const personalizedMessage = messageTemplate(username);

      await twilioClient.messages.create({
        from: fromWhatsAppNumber,
        to: `whatsapp:${phone}`,
      
        body: personalizedMessage,
        mediaUrl: [pdfPublicUrl],
      });

      console.log(`Message sent to ${phone}`);
    }

    res.status(200).json({ success: true, message: 'All messages sent successfully' });
  } catch (err: any) {
    console.error('Error sending messages:', err);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
}
