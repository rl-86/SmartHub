export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') || 'Lycksele';

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=sv`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return Response.json({ error: 'Stad hittades inte' }, { status: 404 });
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    const result = {
      city: name,
      temp: Math.round(weatherData.current_weather.temperature),
    };

    return Response.json(result);
  } catch (err) {
    return Response.json({ error: 'Kunde inte hämta väder' }, { status: 500 });
  }
}
