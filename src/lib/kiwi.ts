
interface FlightSearchParams {
  fly_from: string;
  fly_to: string;
  date_from: string; // DD/MM/YYYY
  date_to: string;   // DD/MM/YYYY
}

export async function searchFlights(params: FlightSearchParams) {
  const apiKey = process.env.KIWI_API_KEY;
  if (!apiKey) {
    console.error('KIWI_API_KEY is not set');
    // Return dummy data if key is missing for demo purposes
    return {
      data: [
        {
          flyFrom: params.fly_from,
          flyTo: params.fly_to,
          price: 450,
          airlines: ['DL'],
          route: [{ airline: 'DL', flight_no: 123 }]
        },
        {
          flyFrom: params.fly_from,
          flyTo: params.fly_to,
          price: 380,
          airlines: ['UA'],
          route: [{ airline: 'UA', flight_no: 456 }]
        }
      ]
    };
  }

  const url = new URL('https://api.tequila.kiwi.com/v2/search');
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  // Default params to make search work easily
  url.searchParams.append('curr', 'USD');
  url.searchParams.append('limit', '5');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
        console.error('Kiwi API Error:', response.status, await response.text());
        return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching flights:', error);
    return null;
  }
}
