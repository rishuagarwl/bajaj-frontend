import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';  // Import custom CSS

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  useEffect(() => {
    document.title = "21BCE10451";  // Replace with your actual roll number
  }, []);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format");
      }
      const res = await axios.post('https://bfhl-backend-wswe.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    return selectedOptions.map(option => (
      <div key={option.value} className="response-block">
        <h3>{option.label}</h3>
        <pre>{JSON.stringify(response[option.value], null, 2)}</pre>
      </div>
    ));
  };


  return (
    <div className="App">
      <h1>API Input</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='{"data":["M","1","334","4","B"]}'
        className="input-field"
        rows="2"
        cols="60"
      />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      {error && <div className="error-message">{error}</div>}
      {response && (
        <div>
          <h2>Multi Filter</h2>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            className="multi-select"
          />
          <div className="filtered-response">
            {renderResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
