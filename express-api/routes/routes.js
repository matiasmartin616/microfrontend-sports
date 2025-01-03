const express = require('express');
const axios = require('axios');
const mockFixtures = require('../mocks/fixtures.json');
const mockStandings = require('../mocks/standings.json');
const mockLeagues = require('../mocks/leagues.json'); // Mock de ligas
const mockSeasons = require('../mocks/seasons.json'); // Mock de temporadas
const mockTeamsData = require('../mocks/teams.json');

const router = express.Router();
const { API_FOOTBALL_KEY, USE_MOCK_DATA } = process.env;

// Cliente de la API de fútbol
const apiFootballClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-rapidapi-key': API_FOOTBALL_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});

// Helper para decidir si usar datos mockeados
const useMockData = async (mockData, apiCall) => {
  if (USE_MOCK_DATA === 'true') {
    console.log('Using mock data as per environment configuration');
    return mockData;
  }

  try {
    const data = await apiCall();
    return data.length > 0 ? data : mockData;
  } catch (error) {
    console.warn('Failed to fetch from API, falling back to mock data', error.message);
    return mockData; 
  }
};

// Endpoint: Live matches
router.get('/live-matches', async (req, res) => {
  try {
    const data = await useMockData(mockFixtures, async () => {
      const response = await apiFootballClient.get('/fixtures', { params: { live: 'all' } });
      return response.data.response || [];
    });
    res.json(data);
  } catch (error) {
    console.error('Error loading live matches:', error.message);
    res.status(500).json({ error: 'Failed to load live matches' });
  }
});

// Endpoint: Standings
router.get('/standings', async (req, res) => {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: 'Missing league or season query parameter' });
  }

  try {
    const data = await useMockData(mockStandings, async () => {
      const response = await apiFootballClient.get('/standings', { params: { league, season } });
      return response.data.response || [];
    });
    res.json(data);
  } catch (error) {
    console.error('Error loading standings:', error.message);
    res.status(500).json({ error: 'Failed to load standings' });
  }
});

// Endpoint: Leagues
router.get('/leagues', async (req, res) => {
  try {
    const data = mockLeagues;
    res.json(data);
  } catch (error) {
    console.error('Error loading leagues:', error.message);
    res.status(500).json({ error: 'Failed to load leagues' });
  }
});

// Endpoint: Seasons
router.get('/seasons', async (req, res) => {
  try {
    const data = mockSeasons;
    res.json(data);
  } catch (error) {
    console.error('Error loading seasons:', error.message);
    res.status(500).json({ error: 'Failed to load seasons' });
  }
});

// Endpoint: Obtener todos los equipos
router.get('/teams', (req, res) => {
  try {
    const teams = mockTeamsData.map(({ team, venue }) => ({
      id: team.id,
      name: team.name,
      code: team.code,
      country: team.country,
      founded: team.founded,
      logo: team.logo,
      venue: {
        id: venue.id,
        name: venue.name,
        city: venue.city,
        capacity: venue.capacity,
        surface: venue.surface,
        image: venue.image,
      },
    }));

    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

module.exports = router;
