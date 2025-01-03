import React from 'react';
import ReactDOM from 'react-dom/client';
import SharedRouter from 'core/SharedRouter'
import App from './App';
import { Suspense, lazy } from 'react';
import './index.css'

const Layout = lazy(() => import('core/Layout'));

const FallbackLayout = ({ children }) => (
  <div>
    <header>
      <h1>Fallback Layout</h1>
    </header>
    <main>{children}</main>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SharedRouter>
      <Suspense fallback={<FallbackLayout>Loading...</FallbackLayout>}>
        <Layout>
          <App />
        </Layout>
      </Suspense>
    </SharedRouter>
  </React.StrictMode>
);