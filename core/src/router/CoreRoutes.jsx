import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { safeImport } from '../utils/safeImport';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';

// Carga dinámica de microfrontends con manejo de errores
const LiveResultsRemote = lazy(() =>
  safeImport(() => import('liveResults/App'), () => <ErrorComponent message="Failed to load Live Results" />)
);
const ScoreboardsRemote = lazy(() =>
  safeImport(() => import('scoreboards/App'), () => <ErrorComponent message="Failed to load Scoreboards" />)
);
const TeamStatsRemote = lazy(() =>
  safeImport(() => import('teamStats/App'), () => <ErrorComponent message="Failed to load Team Stats" />)
);

export default function CoreRouter() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/" element={<LiveResultsRemote />} />
        <Route path="/scoreboards/*" element={<ScoreboardsRemote />} />
        <Route path="/team-stats/*" element={<TeamStatsRemote />} />
      </Routes>
    </Suspense>
  );
}
