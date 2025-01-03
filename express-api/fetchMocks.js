require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

// Configuración del cliente de API Football
const apiFootballClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});

// Helper para guardar datos en un archivo JSON
const saveToFile = (filename, data) => {
  fs.writeFileSync(`./mocks/${filename}`, JSON.stringify(data, null, 2));
  console.log(`${filename} saved successfully!`);
};

// Fetch teams by league and season
const fetchTeams = async (leagueId, season) => {
  try {
    const response = await apiFootballClient.get('/teams', { params: { league: leagueId, season } });
    saveToFile(`teams_${leagueId}_${season}.json`, response.data.response); // Guardar equipos específicos
  } catch (error) {
    console.error(`Error fetching teams for league ${leagueId} and season ${season}:`, error.message);
  }
};

// Fetch team details by team ID
const fetchTeamDetails = async (teamId) => {
  try {
    const response = await apiFootballClient.get('/teams', { params: { id: teamId } });
    saveToFile(`team_${teamId}.json`, response.data.response); // Guardar detalles de un equipo específico
  } catch (error) {
    console.error(`Error fetching details for team ${teamId}:`, error.message);
  }
};

// Llama a las funciones para obtener los datos y guardarlos
(async () => {
  const leagueId = 39; // Ejemplo: Premier League
  const season = 2022; // Ejemplo: Temporada 2022
  const teamId = 33; // Ejemplo: Equipo Manchester United

  await fetchTeams(leagueId, season);
  await fetchTeamDetails(teamId);
})();
