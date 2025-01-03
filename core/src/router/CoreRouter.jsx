import { BrowserRouter } from 'react-router-dom';
import CoreRoutes from './CoreRoutes';
import Layout from '../layout/layout';

export default function CoreRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <CoreRoutes/>
      </Layout>
    </BrowserRouter>
  );
}
