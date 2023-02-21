import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Layout from './components/layout';

const Dashboard = () => {
  return <Layout>
    <Helmet>
      <title>Travelopia - Dashboard</title>
    </Helmet>
    <h2>Dashboard</h2>
		The dashboard goes here.
  </Layout>;
};

export default Dashboard;