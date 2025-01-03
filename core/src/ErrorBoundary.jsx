import React from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import ErrorComponent from './components/ErrorComponent';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registrar el error en un servicio de monitoreo o consola
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorComponent
          message="An unexpected error occurred. Please try again later."
          retry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}

// Validación de props con PropTypes
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Componente(s) hijo(s) requeridos
};

export default ErrorBoundary;
