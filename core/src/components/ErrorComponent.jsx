import PropTypes from 'prop-types'; // Importar PropTypes

const ErrorComponent = ({ message, retry }) => {
  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg mb-6">{message || 'We encountered an unexpected error.'}</p>
        {retry && (
          <button
            onClick={retry}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        )}
      </div>
  );
};

// Validación de props con PropTypes
ErrorComponent.propTypes = {
  message: PropTypes.string, // Espera un mensaje de texto opcional
  retry: PropTypes.func, // Función opcional para el botón "Retry"
};

// Valores por defecto para las props opcionales
ErrorComponent.defaultProps = {
  message: 'We encountered an unexpected error.', // Mensaje predeterminado
  retry: null, // Sin función de retry por defecto
};

export default ErrorComponent;
