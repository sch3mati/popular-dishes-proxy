/* eslint-disable import/no-unresolved */
// import http from 'k6/http';
// import { sleep } from 'k6';
const http = require('k6/http');
const k6 = require('k6');

export const options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '1m', target: 500 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 500 },
    { duration: '30s', target: 200 },
    // { duration: '30s', target: 1500 },
    // { duration: '2m', target: 1500 },
    // { duration: '1m', target: 400 },
    // { duration: '1m', target: 0 },
  ],
};

export default function main() {
  const url = 'http://localhost:5004';
  const restaurantId = Math.floor(Math.random() * 2000000 - 1) + 1;
  http.get(`${url}/api/restaurants/${restaurantId}/dishes`);
  k6.sleep(0.25);
}
