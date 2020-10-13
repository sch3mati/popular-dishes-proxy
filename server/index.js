const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));

const port = 3005;

app.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});

app.get('*', (reqProxy, resProxy) => {
  const service = reqProxy.path.split('/')[2];
  if (service === 'bookings') {
    axios.get(`http://localhost:3000${reqProxy.path}`, {
      params: reqProxy.query
    })
      .then((response) => {
        resProxy.send(response.data);
      });
  } else if (service === 'dishes') {
    axios.get(`http://localhost:3001${reqProxy.path}`)
      .then((response) => {
        resProxy.send(response.data);
      });
  } else if (service === 'restaurants') {
    axios.get(`http://localhost:3003${reqProxy.path}`)
      .then((response) => {
        resProxy.send(response.data);
      });
  } else if (service === 'review_list') {
    axios.get(`http://localhost:3002${reqProxy.path}`)
      .then((response) => {
        resProxy.send(response.data);
      });
  }
});

app.post('*', (reqProxy, resProxy) => {
  const service = reqProxy.path.split('/')[2];
  if (service === 'bookings') {
    axios.post(`http://localhost:3000${reqProxy.path}`, reqProxy.body)
      .then((response) => {
        resProxy.send(response.data);
      });
  } else if (service === 'dishes') {
    axios.get(`http://localhost:3001${reqProxy.path}`, reqProxy.body)
      .then((response) => {
        resProxy.send(response.data);
      });
  } else if (service === 'restaurants') {
    axios.get(`http://localhost:3003${reqProxy.path}`, reqProxy.body)
      .then((response) => {
        resProxy.send(response.data);
      });
  } else if (service === 'review_list') {
    axios.get(`http://localhost:3002${reqProxy.path}`, reqProxy.body)
      .then((response) => {
        resProxy.send(response.data);
      });
  }
});