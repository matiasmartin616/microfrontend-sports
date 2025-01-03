import ErrorBoundary from './ErrorBoundary';
import CoreRouter from './router/CoreRouter';

export default function App() {
  return (
    <ErrorBoundary>
      <CoreRouter />
    </ErrorBoundary>
);
}