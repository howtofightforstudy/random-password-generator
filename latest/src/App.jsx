import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import './App.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function App() {
  const [value, setValue] = useState(8);   
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const inputRef = useRef(null);

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setSuccessMessage("Password copied to clipboard!");
        setTimeout(() => setSuccessMessage(""), 2000);
      })
      .catch(err => console.error('Copy failed', err));
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setPasswordLength(newValue);
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    setPasswordLength(newValue);
  };

  return (
    <div className='App'>
      <div className='secondArea'> 
        <h1>Customize Your Password</h1>
        <h2>Password Length</h2>
        <div className='oneByOne'>
          <div className="combo">
            <input
              className='numbers'
              id="number-spinner"
              type="number"
              value={passwordLength}
              onChange={handleInputChange}
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
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={() => setUseUppercase(!useUppercase)}
              />
              Uppercase
            </label>
            <label className='checkbox'>
              <input
                type="checkbox"
                checked={useLowercase}
                onChange={() => setUseLowercase(!useLowercase)}
              />
              Lowercase
            </label>
            <label className='checkbox'>
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={() => setUseNumbers(!useNumbers)}
              />
              Numbers
            </label>
            <label className='checkbox'>
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
              />
              Symbols
            </label>
          </div>
        </div>
      </div>
      <div className="forFirstArea">
        <div className='firstArea1'>
          <button 
            className='rotate' 
            onClick={generatePassword}
          >
            Generate
          </button> 
        </div>    
          {password && (
            <div className="azy">
            <div className='firstArea2'>
              <button
                className='copy'
                style={{
                }}
                onClick={copyToClipboard}
              >
                <FontAwesomeIcon icon={faCopy}/>
              </button>
              <input className='passwordInput'
              type="text" 
              value={password} 
              readOnly />
             </div> 
             <div className='message'>
              {successMessage && (
                <p style={{ color: "black", textAlign: "center" }}>
                  {successMessage}
                </p>
              )}
            </div>
        </div>
          )}
    </div>
  </div>
  );
}

export default App;
