
import './App.css';
import axios from 'axios';

function App() {
  const brokerTest = () => {
    axios.post('http://localhost:8080/', { "test": "test" })
      .then(response => {
        document.getElementById('received').innerHTML += `<br/>${JSON.stringify(response.data)}`;
      })
      .catch(error => {
        document.getElementById('output').innerHTML += error;
      });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-5">Test microservices</h1>
          <hr />
          <a onClick={() => {
            brokerTest()
          }} id="brokerBtn" className="btn btn-outline-secondary" href="javascript:void(0);">Broker Test</a>

          <div id="output" className="mt-5" style={{ "outline": "1px solid silver", "padding": "2em" }}>
            <span className="text-muted">Output shows here...</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4 className="mt-5">Sent</h4>
          <div className="mt-1" style={{ "outline": "1px solid silver", "padding": "2em" }}>
            <pre id="payload"><span className="text-muted">Nothing sent yet...</span></pre>
          </div>
        </div>
        <div className="col">
          <h4 className="mt-5">Received</h4>
          <div className="mt-1" style={{ "outline": "1px solid silver", "padding": "2em" }}>
            <pre id="received"><span className="text-muted">Nothing received yet...</span></pre>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
