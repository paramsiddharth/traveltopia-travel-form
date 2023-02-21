import { useState } from 'react';
import {
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';

import './App.css';

const places = [
  'India',
  'Africa',
  'Europe'
];

function App() {
  const [destination, setDestination] = useState(null);

  const onChange = set => e => set(e.target.value);

  return (
    <div className="App">
      <h1>Travelopia</h1>
      <h2>Submission Form</h2>
      <div>
        <form>
          <p>
            Contact us to plan your next journey!
          </p>
          <div className='input-field'>
            <TextField
              variant='filled'
              fullWidth
              label='Name'
              required
            />
          </div>
          <div className='input-field'>
            <TextField
              variant='filled'
              fullWidth
              label='E-mail address'
              type='email'
              required
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
            />
          </div>
          <div className='input-field submit'>
            <Chip label='Net budget: $400' onClick={() => {}} />
            <Button
              sx={{
                paddingRight: 4,
                paddingLeft:  4
              }}
              variant='contained'
              color='primary'
            >Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
