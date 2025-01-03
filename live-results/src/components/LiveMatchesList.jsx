import PropTypes from "prop-types";
import LiveMatchItem from "./LiveMatchItem";

export default function LiveMatchesList({ matches }) {
  if (!Array.isArray(matches) || matches.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No matches to display.
      </p>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 gap-4 w-full max-w-full">
        {matches.map((match, index) => (
          <LiveMatchItem key={match.fixture?.id || index} match={match} />
        ))}
      </div>
    </div>
  );
}

LiveMatchesList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
};
