import PropTypes from 'prop-types';

export default function LeagueList({ leagues, onSelectLeague }) {
  const placeholderLogo = 'https://via.placeholder.com/100x100?text=No+Logo';

  const leaguesByCountry = leagues.reduce((acc, league) => {
    const country = league.country.name;
    acc[country] = acc[country] || [];
    acc[country].push(league);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(leaguesByCountry).map(([country, leagues]) => (
        <div key={country} className="mb-6">
          <h2 className="text-xl font-bold mb-4">{country}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leagues.map((league) => (
              <div
                key={league.league.id}
                className="p-4 bg-white shadow rounded hover:shadow-lg cursor-pointer"
                onClick={() => onSelectLeague(league)}
              >
                <img
                  src={league.league.logo}
                  alt={league.league.name}
                  className="h-12 mx-auto object-contain"
                  loading="lazy" // Lazy loading
                  onError={(e) => (e.target.src = placeholderLogo)} // Placeholder si falla
                  style={{
                    filter: 'blur(10px)', // Blur inicial
                    transition: 'filter 0.3s ease-in-out',
                  }}
                  onLoad={(e) => (e.target.style.filter = 'blur(0)')} // Remover blur al cargar
                />
                <h3 className="text-center text-lg font-semibold mt-2">{league.league.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

LeagueList.propTypes = {
  leagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectLeague: PropTypes.func.isRequired,
};
