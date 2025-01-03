const API_BASE_URL = 'http://localhost:4000/api'; // URL base de tu API Express

export async function getSeasons() {
  const response = await fetch(`${API_BASE_URL}/seasons`);
  if (!response.ok) {
    throw new Error(`Error fetching seasons: ${response.statusText}`);
  }
  return response.json();
}

export async function getLeagues() {
  const response = await fetch(`${API_BASE_URL}/leagues`);
  if (!response.ok) {
    throw new Error(`Error fetching leagues: ${response.statusText}`);
  }
  return response.json();
}

export async function getStandings(leagueId, season) {
  const response = await fetch(`${API_BASE_URL}/standings?league=${leagueId}&season=${season}`);
  if (!response.ok) {
    throw new Error(`Error fetching standings: ${response.statusText}`);
  }
  return response.json();
}
