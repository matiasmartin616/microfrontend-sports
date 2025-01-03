import { useEffect, useState } from 'react';
import { getLiveMatches } from '../services/api';
import LiveMatchesList from '../components/LiveMatchesList';

export default function LiveResultsPage() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getLiveMatches();
        setLiveMatches(data);
      } catch (err) {
        setError('Failed to load live matches');
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading live matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );
  }

  if (!liveMatches || liveMatches.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">
          No live matches available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 bg-gray-50 max-w-screen overflow-x-hidden">
      <h1 className="text-xl font-bold px-4 mb-6 text-gray-700">
        Live Football Results
      </h1>
      <LiveMatchesList matches={liveMatches} />
    </div>
  );
}
