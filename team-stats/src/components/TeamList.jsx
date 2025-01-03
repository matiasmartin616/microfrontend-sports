import { useState } from 'react';
import PropTypes from 'prop-types';

function TeamList({ teams, onTeamClick }) {
  const [search, setSearch] = useState('');

  // Filter teams based on the search input
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search teams..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <ul className="bg-white shadow-md rounded-lg">
        {filteredTeams.map((team) => (
          <li
            key={team.id}
            className="p-4 border-b last:border-none cursor-pointer hover:bg-gray-50"
            onClick={() => onTeamClick(team)}
          >
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

TeamList.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTeamClick: PropTypes.func.isRequired,
};

export default TeamList;