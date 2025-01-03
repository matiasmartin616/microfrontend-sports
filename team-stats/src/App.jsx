import { useState, useEffect } from 'react';
import TeamList from './components/TeamList';
import TeamDetails from './components/TeamDetails';

function App() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Fetch teams from the API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/teams'); // Cambia la URL si es necesario
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="app">
      {selectedTeam ? (
        <TeamDetails team={selectedTeam} onBack={() => setSelectedTeam(null)} />
      ) : (
        <TeamList teams={teams} onTeamClick={setSelectedTeam} />
      )}
    </div>
  );
}

export default App;
