export async function POST(req) {
  const { prompt } = await req.json();

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await res.json();
  console.log('OpenAI API response:', data);

  if (!data.choices || !data.choices[0]) {
    return Response.json({ reply: 'Inget svar från AI 🤖', raw: data });
  }

  return Response.json({ reply: data.choices[0].message.content });
}
