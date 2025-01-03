import PropTypes from 'prop-types';

export default function Standings({ standings }) {
  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Team</th>
            <th className="py-2 px-4 border">Played</th>
            <th className="py-2 px-4 border">Won</th>
            <th className="py-2 px-4 border">Drawn</th>
            <th className="py-2 px-4 border">Lost</th>
            <th className="py-2 px-4 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={team.team.id}>
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border flex items-center space-x-2">
                <img src={team.team.logo} alt={team.team.name} className="h-6" />
                <span>{team.team.name}</span>
              </td>
              <td className="py-2 px-4 border">{team.all.played}</td>
              <td className="py-2 px-4 border">{team.all.win}</td>
              <td className="py-2 px-4 border">{team.all.draw}</td>
              <td className="py-2 px-4 border">{team.all.lose}</td>
              <td className="py-2 px-4 border">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Standings.propTypes = {
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};
