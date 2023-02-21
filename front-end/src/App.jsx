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

import './App.css';
import Layout from './components/layout';

const places = [
  'India',
  'Africa',
  'Europe'
];

function App() {
  const [name, setName]                       = useState('');
  const [email, setEmail]                     = useState('');
  const [destination, setDestination]         = useState(null);
  const [travellerCount, setTravellerCount]   = useState(2);
  const [budgetPerPerson, setBudgetPerPerson] = useState(1500);

  const netBudget = travellerCount * budgetPerPerson;

  const onChange = set => e => set(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const reqBody = {
      name,
      email,
      destination,
      travellerCount,
      budgetPerPerson
    };
    
    // Handle submission
  };

  return (
    <Layout>
      <Helmet>
        <title>Travelopia - Submission Form</title>
      </Helmet>
      <h2>Submission Form</h2>
      <div>
        <form onSubmit={onSubmit}>
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
      </div>
    </Layout>
  );
}

export default App;