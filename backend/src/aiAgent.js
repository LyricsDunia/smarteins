import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function chatAI(message, products) {
  const productContext = products
    .map(p => `${p.name} - ₹${p.price}`)
    .join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are GadgetGenie, an expert electronics advisor."
      },
      {
        role: "user",
        content: `
User message: ${message}

Available products:
${productContext}

Respond concisely and helpfully.
`
      }
    ]
  });

  return completion.choices[0].message.content;
}
