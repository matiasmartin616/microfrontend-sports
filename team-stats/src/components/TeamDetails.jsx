import PropTypes from 'prop-types';

function TeamDetails({ team, onBack }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <button
        onClick={onBack}
        className="text-indigo-500 underline hover:text-indigo-700 mb-4"
      >
        Back
      </button>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={team.logo}
          alt={`${team.name} logo`}
          className="h-16 w-16 rounded-full shadow"
        />
        <h2 className="text-2xl font-bold">{team.name}</h2>
      </div>
      <p className="mb-2">
        <strong>Founded:</strong> {team.founded}
      </p>
      <p className="mb-4">
        <strong>Country:</strong> {team.country}
      </p>
      <h3 className="text-xl font-semibold mb-4">Stadium</h3>
      <img
        src={team.venue.image}
        alt={`${team.venue.name}`}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <p className="mb-2">
        <strong>Name:</strong> {team.venue.name}
      </p>
      <p className="mb-2">
        <strong>City:</strong> {team.venue.city}
      </p>
      <p className="mb-2">
        <strong>Capacity:</strong> {team.venue.capacity}
      </p>
      <p>
        <strong>Surface:</strong> {team.venue.surface}
      </p>
    </div>
  );
}

TeamDetails.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    founded: PropTypes.number,
    country: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
      surface: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default TeamDetails;