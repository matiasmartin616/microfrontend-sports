export async function getLiveMatches() {
    try {
      // Llamas a tu servidor Node, no a la API-Football
      const res = await fetch('http://localhost:4000/api/live-matches');
      const data = await res.json();
      return data; // esto es el array response de la API-Football
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  