import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function App() {
  const [value, setValue] = useState(8); // Başlangıç değeri
  const inputRef = useRef(null);
  const [checked, setChecked] = React.useState(true);

  const handleCopy = async () => {
    try{
      const text= inputRef.current.value;
      await navigator.clipboard.writeText(text);
      alert('kopyalandı');
    } catch (err) {
      console.error('kopyalama başarısız', err);
    }
  }

  const handleNumberChange = (event) => {
    setValue(event.target.value);
  };

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <div className='App'>
      <div className='firstArea'> 
        <input className='text' 
        type='text'
        ref={inputRef}
        />
        <button className='copy'
        onClick={handleCopy}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button className='rotate'>
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>

      <div className='secondArea'> 
        <h1>Customize Your Password</h1>
        <h2>Password Length</h2>

<div className='oneByOne'>

        <div className="combo">
          <input
            className='numbers'
            id="number-spinner"
            type="number"
            value={value}
            onChange={handleNumberChange}
            min="1"
            max="50"
            step="1"
          />
          
          <Box sx={{ width: 200, margin: 'auto' }}>
           <Slider className='sliderClick'    
           value={value}
           onChange={handleSliderChange}
           aria-label="Default"       
           valueLabelDisplay="auto"          
            sx={{  
              color: 'rgb(61, 122, 214)',  
              '& .MuiSlider-rail': {backgroundColor: 'gray'}
            }}
          />
          </Box>
        </div>

        <div className='check'>

          <label className='checkbox'>
          <input type="checkbox" 
          />
           Uppercase
          </label>

          <label className='checkbox'>
          <input type="checkbox" 
          />
           Lowercase
          </label>

          <label className='checkbox'>
          <input type="checkbox" 
          />
           Numbers
          </label>

          <label className='checkbox'>
          <input type="checkbox" 
          />
           Symbols
          </label>

        </div>
</div>
      </div>
    </div>
  );
}

export default App;