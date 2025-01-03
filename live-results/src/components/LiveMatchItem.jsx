import PropTypes from "prop-types";

export default function LiveMatchItem({ match }) {
  if (!match) {
    return (
      <p className="text-center text-gray-500 italic">
        No match data available.
      </p>
    );
  }

  const {
    teams: { home, away } = {},
    goals = {},
    league = {},
    fixture = {},
  } = match;

  const homeTeamName = home?.name || "Unknown Home Team";
  const awayTeamName = away?.name || "Unknown Away Team";
  const homeGoals = goals?.home !== undefined ? goals.home : "-";
  const awayGoals = goals?.away !== undefined ? goals.away : "-";
  const leagueName = league?.name || "Unknown League";
  const matchDate = new Date(fixture?.date).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const matchTime = new Date(fixture?.date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full">
      <h3 className="text-xs text-gray-500">{leagueName}</h3>
      <div className="grid grid-rows-3 sm:grid-cols-3 gap-2 bg-white shadow-sm border rounded-lg py-2 px-4 hover:shadow-md transition w-full">
        {/* Columna 1: Equipo local */}
        <div className="flex items-center justify-start space-x-2">
          <img
            src={home?.logo}
            alt={`${homeTeamName} logo`}
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />
          <p className="text-sm font-medium truncate text-left">{homeTeamName}</p>
        </div>

        {/* Columna 2: Marcador y hora */}
        <div className="text-center">
          <p className="text-lg font-bold">
            {homeGoals} - {awayGoals}
          </p>
          <p className="text-xs text-gray-500">
            {matchDate}, {matchTime}
          </p>
        </div>

        {/* Columna 3: Equipo visitante */}
        <div className="flex items-center justify-end space-x-2">
          <p className="text-sm font-medium truncate text-right">{awayTeamName}</p>
          <img
            src={away?.logo}
            alt={`${awayTeamName} logo`}
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

LiveMatchItem.propTypes = {
  match: PropTypes.shape({
    teams: PropTypes.shape({
      home: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
      away: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
      }),
    }),
    goals: PropTypes.shape({
      home: PropTypes.number,
      away: PropTypes.number,
    }),
    league: PropTypes.shape({
      name: PropTypes.string,
    }),
    fixture: PropTypes.shape({
      date: PropTypes.string,
    }),
  }),
};
