import { useState, useEffect } from 'react';
import { getLeagues, getSeasons, getStandings } from '../services/api';
import LeagueList from '../components/LeagueList';
import Standings from '../components/Standings';

export default function StandingsPage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]); // Filtradas por season
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [standings, setStandings] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const placeholderFlag = 'https://via.placeholder.com/100x60?text=No+Flag';

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const seasonsData = await getSeasons();
        setSeasons(seasonsData);
        setSelectedSeason(seasonsData[0]); // Selecciona la primera temporada por defecto
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };

    const fetchLeagues = async () => {
      try {
        const leaguesData = await getLeagues();
        setLeagues(leaguesData);

        // Extraer los países únicos de las ligas
        const countriesData = Array.from(
          new Set(leaguesData.map((league) => league.country.name))
        ).map((country) => ({
          name: country,
          flag: leaguesData.find((league) => league.country.name === country).country.flag,
        }));
        setCountries(countriesData);
        setFilteredCountries(countriesData);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchSeasons();
    fetchLeagues();
  }, []);

  // Filtrar las ligas basadas en el país seleccionado y la temporada
  useEffect(() => {
    if (selectedCountry && selectedSeason) {
      const filtered = leagues.filter(
        (league) =>
          league.country.name === selectedCountry &&
          league.seasons.some((season) => season.year === parseInt(selectedSeason))
      );
      setFilteredLeagues(filtered);
    } else {
      setFilteredLeagues([]);
    }
  }, [selectedCountry, selectedSeason, leagues]);

  useEffect(() => {
    const lowerSearchText = searchText.toLowerCase();
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(lowerSearchText)
    );
    setFilteredCountries(filtered);
  }, [searchText, countries]);

  useEffect(() => {
    if (!selectedCountry) {
      setSearchText('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedLeague && selectedSeason) {
      const fetchStandings = async () => {
        try {
          const standingsData = await getStandings(selectedLeague.league.id, selectedSeason);
          setStandings(standingsData[0]?.league?.standings[0] || []);
        } catch (error) {
          console.error('Error fetching standings:', error);
        }
      };
      fetchStandings();
    }
  }, [selectedLeague, selectedSeason]);

  return (
    <div className="p-6">
      {!selectedCountry ? (
        <div>
          <h1 className="text-xl font-bold mb-4">Select a Country</h1>
          <input
            type="text"
            placeholder="Search countries..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCountries.map((country) => (
              <div
                key={country.name}
                className="p-4 bg-white shadow rounded hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedCountry(country.name)}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="h-12 mx-auto object-contain"
                  loading="lazy"
                  onError={(e) => (e.target.src = placeholderFlag)}
                />
                <h3 className="text-center text-lg font-semibold mt-2">{country.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : !selectedLeague ? (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setSelectedCountry(null)}
          >
            Back to Countries
          </button>
          <div className="mb-4">
            <select
              value={selectedSeason || ''}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="p-2 border rounded"
            >
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>
          <LeagueList leagues={filteredLeagues} onSelectLeague={setSelectedLeague} />
        </div>
      ) : (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setSelectedLeague(null)}
          >
            Back to Leagues
          </button>
          <Standings standings={standings} />
        </div>
      )}
    </div>
  );
}
