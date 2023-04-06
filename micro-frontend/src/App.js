
import './App.css';
import Recieved from './components/recieved';
import Sent from './components/sent';
import axios from 'axios';
import React, { useState } from 'react';
function App() {
  const [recievedData, setRecievedData] = useState([]);
  const [sentData, setSentData] = useState([]);

  const brokerTest = () => {
    const payload = { "test": "test", "timestamp": Date.now(), "id": Math.random(), "type": "test", "data": "test", "source": "test" };
    setSentData([...sentData, payload]);
    axios.post('http://localhost:8080/', { "test": "test" })
      .then(response => {
        setRecievedData([...recievedData, response.data]);
      })
      .catch(error => {
        document.getElementById('output').innerHTML += error;
      });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-5">🚀Micro-Frontend</h1>
          <hr />
          <button onClick={() => {
            brokerTest()
          }} id="brokerBtn" className="btn btn-outline-secondary">Broker Test</button>

          <div id="output" className="mt-5" style={{ "outline": "1px solid silver", "padding": "2em" }}>
            <span className="text-muted">Output shows here...</span>
          </div>
        </div>
      </div>
      <div className="row">
        <Sent sentData={sentData} />
        <Recieved data={recievedData} />
      </div>
    </div >
  );
}

export default App;
