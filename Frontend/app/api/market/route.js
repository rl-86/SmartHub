let cachedData = null;
let cachedAt = 0;

export async function GET() {
  const now = Date.now();
  const ONE_MINUTE = 60 * 1000;

  if (cachedData && now - cachedAt < ONE_MINUTE) {
    return Response.json({
      lastUpdated: new Date(cachedAt).toISOString(),
      data: cachedData,
      source: 'cache',
    });
  }

  const symbols = [{ name: 'USD to SEK', symbol: 'USD/SEK' }];

  const API_KEY = process.env.TWELVE_API_KEY;
  const results = [];

  for (const item of symbols) {
    try {
      const [quoteRes, sparklineRes] = await Promise.all([
        fetch(
          `https://api.twelvedata.com/quote?symbol=${item.symbol}&apikey=${API_KEY}`
        ),
        fetch(
          `https://api.twelvedata.com/time_series?symbol=${item.symbol}&interval=1min&outputsize=30&apikey=${API_KEY}`
        ),
      ]);

      const quote = await quoteRes.json();
      const sparkline = await sparklineRes.json();

      const price =
        quote.price !== undefined
          ? parseFloat(quote.price)
          : quote.close !== undefined
          ? parseFloat(quote.close)
          : null;

      if (!price) continue;

      results.push({
        name: item.name,
        symbol: item.symbol,
        price: price,
        change_percent: parseFloat(quote.percent_change || 0),
        trend:
          sparkline?.values?.reverse().map((p) => parseFloat(p.close)) || [],
      });
    } catch (err) {
      console.error(`Error for ${item.symbol}`, err);
    }
  }

  cachedData = results;
  cachedAt = now;

  return Response.json({
    lastUpdated: new Date(cachedAt).toISOString(),
    data: results,
    source: 'live',
  });
}
