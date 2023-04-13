
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

  const authTest = () => {
    const payload = { "action": "auth", "auth": { "email": "admin@example.com", "password": "verysecret" } }
    axios.post('http://localhost:8080/handle', payload)
      .then(response => {
        setSentData([...sentData, payload]);
        setRecievedData([...recievedData, response.data]);
      })
      .catch(error => {
        document.getElementById('output').innerHTML += error;
      });
  }

  const logTest = () => {
    const payload = { "action": "log", "log": { "name": "event", "data": "some kind of data" } }
    axios.post('http://localhost:8080/handle', payload)
      .then(response => {
        setSentData([...sentData, payload]);
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
          <div className='row'>
            <button onClick={() => {
              brokerTest()
            }} id="brokerBtn" className="btn btn-outline-secondary">Broker Test</button>
            <button onClick={() => { authTest() }} id="authBtn" className="btn btn-outline-secondary">Auth Test</button>
            <button onClick={() => { logTest() }} id="logBtn" className="btn btn-outline-secondary">Log Test</button>
          </div>
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
