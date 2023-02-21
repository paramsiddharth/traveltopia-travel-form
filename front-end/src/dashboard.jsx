import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Vortex } from 'react-loader-spinner';
import { Refresh } from '@mui/icons-material';
import axios from 'axios';

import Layout from './components/layout';
import { BACKEND_URL } from './config';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [submissions, setSubmissions] = useState(null);
  const [page, setPage]               = useState(0);
  const [total, setTotal]             = useState(0);
  const [loaded, setLoaded]           = useState(0);
  const [reload, setReload]           = useState(false);

  const fetchData = async () => {
    const {
      data: {
        submissions: newSubmissions,
        page: newPage,
        total: newTotal
      }
    } = await axios.get(BACKEND_URL + 'api/submissions', {
      params: {
        page
      }
    });
    setSubmissions(newSubmissions);
    setPage(newPage);
    setTotal(newTotal);
  };

  const decoratedFetchData = async () => {
    try {
      setLoaded(0);
      await fetchData();
      setLoaded(1);
    } catch (e) {
      setLoaded(0);
      throw e;
    }
  };

  const toPage = no => async () => {
    if (no !== page) {
      setLoaded(0);
      setPage(no);
      setReload(!reload);
    } else {
      try {
        await fetchData();
      } catch (e) {
        setLoaded(0);
        throw e;
      }
    }
  };

  useEffect(() => { decoratedFetchData(); }, []);
  useEffect(() => { decoratedFetchData(); }, [reload]);

  return <Layout>
    <Helmet>
      <title>Travelopia - Dashboard</title>
    </Helmet>
    <h2>Dashboard</h2>
    {
      loaded === 0
        ? <div>
          <Vortex
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
          <br />
          Loading...
        </div>
        : <div>
          <div style={{ display: 'flex', marginBottom: 15 }}>
            <Button disabled={page < 1} variant='contained' color='warning'
              onClick={toPage(page - 1)}
              sx={{ marginRight: 1 }}
            >
              Previous
            </Button>
            <Button variant='contained' color='error'
              onClick={toPage(page)}
            >
              <Refresh />
            </Button>
            <div style={{ flexGrow: 1, textAlign: 'center' }}>
              Page { page + 1 } of { total }
            </div>
            <Button variant='contained' color='info'
              href='/api/csv'
              download='entries.csv'
              sx={{ marginRight: 1 }}
            >
              Download CSV
            </Button>
            <Button disabled={page >= total - 1 } variant='contained' color='success'
              onClick={toPage(page + 1)}
            >
              Next
            </Button>
          </div>
          <TableContainer sx={{ maxWidth: '90vw', maxHeight: '90vh' }} component={ Paper }>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>E-mail address</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Traveller Count</TableCell>
                  <TableCell>Budget Per Person</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map(entry => (
                  <TableRow
                    key={entry._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      ...{entry._id.substring(20)}
                    </TableCell>
                    <TableCell>{ entry.name }</TableCell>
                    <TableCell style={{ textDecoration: 'underline' }}>
                      <Link style={{ color: 'inherit' }} href={`mailto:${entry.email}`}>
                        { entry.email }
                      </Link>
                    </TableCell>
                    <TableCell>{ entry.destination }</TableCell>
                    <TableCell>{ entry.travellerCount }</TableCell>
                    <TableCell>${ entry.budgetPerPerson }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    }
  </Layout>;
};

export default Dashboard;