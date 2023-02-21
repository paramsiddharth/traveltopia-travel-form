import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Layout from './components/layout';

const NotFound = () => {
  return <Layout>
    <Helmet>
      <title>Travelopia - Page Not Found</title>
    </Helmet>
    <h2>Page Not Found</h2>
		The page you are trying to navigate to does not exist. Try going back to <Link to='/'>home</Link>.
  </Layout>;
};

export default NotFound;