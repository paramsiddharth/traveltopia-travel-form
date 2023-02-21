import { useState } from 'react';
import {
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Vortex } from 'react-loader-spinner';

import './app.css';
import Layout from './components/layout';
import { BACKEND_URL } from './config';
import { maxSubmissionsPerPage } from '../../config.json';

const places = [
  'India',
  'Africa',
  'Europe'
];

function App() {
  const [name, setName]                       = useState('');
  const [email, setEmail]                     = useState('');
  const [destination, setDestination]         = useState('');
  const [travellerCount, setTravellerCount]   = useState(2);
  const [budgetPerPerson, setBudgetPerPerson] = useState(1500);

  const [submitted, setSubmitted] = useState(0);
  const [subID, setSubID] = useState(null);

  const netBudget = travellerCount * budgetPerPerson;

  const onChange = set => e => set(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();

    setSubmitted(1);

    const reqBody = {
      name,
      email,
      destination,
      travellerCount,
      budgetPerPerson
    };
    
    try {
      const resp = await axios.post(BACKEND_URL + 'api/submissions', reqBody);
      setSubID(resp.data._id);
      setSubmitted(2);
    } catch (e) {
      setSubmitted(0);
      // throw e;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Travelopia - Submission Form</title>
      </Helmet>
      <h2>Submission Form</h2>
      <div>
        {
          submitted === 0
            ? <form onSubmit={onSubmit}>
              <p>
              Contact us to plan your next journey!
              </p>
              <div className='input-field'>
                <TextField
                  variant='filled'
                  fullWidth
                  label='Name'
                  required
                  value={name}
                  onChange={onChange(setName)}
                />
              </div>
              <div className='input-field'>
                <TextField
                  variant='filled'
                  fullWidth
                  label='E-mail address'
                  type='email'
                  required
                  value={email}
                  onChange={onChange(setEmail)}
                />
              </div>
              <div className='input-field'>
                <FormControl variant='filled' sx={{ width: '100%', textAlign: 'left' }}>
                  <InputLabel id='destination' mt={3}>Where do you want to go? *</InputLabel>
                  <Select
                    labelId='destination'
                    required
                    value={destination}
                    onChange={onChange(setDestination)}
                  >
                    {places.map(place => (
                      <MenuItem key={place} value={place}>
                        { place }
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='input-field'>
                <TextField
                  variant='filled'
                  fullWidth
                  label='Number of travellers'
                  type='number'
                  required
                  value={travellerCount}
                  onChange={onChange(setTravellerCount)}
                />
              </div>
              <div className='input-field'>
                <TextField
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                  }}
                  variant='filled'
                  fullWidth
                  label='Budget per person'
                  type='number'
                  required
                  value={budgetPerPerson}
                  onChange={onChange(setBudgetPerPerson)}
                />
              </div>
              <div className='input-field submit'>
                <Chip label={`Net budget: $${netBudget}`} onClick={() => {}} />
                <Button
                  sx={{
                    paddingRight: 4,
                    paddingLeft:  4
                  }}
                  variant='contained'
                  color='primary'
                  type='submit'
                >
                Submit
                </Button>
              </div>
            </form>
            : submitted === 1
              ? <div>
                <Vortex
                  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
                <br />
                Submitting...
              </div>
              : <div>
                <h3>Submitted!</h3>
                <span>Your submission has been made with ID { subID }.</span>
              </div>
        }
      </div>
    </Layout>
  );
}

export default App;