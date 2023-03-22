const dotenv = require('dotenv');
dotenv.config();

const relate = require('./database/relationships');
relate();

const {
  loginWithEmailPassword,
  loginWithToken,
  loginWithApi
} = require('./auth');

// loginWithEmailPassword('rash23307@gmail.com', '1234').then((res) => console.log(res));

// loginWithToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywiZW1haWwiOiJyYXNoMjMzMDdAZ21haWwuY29tIiwiaWF0IjoxNjc5NTAzODk1LCJleHAiOjE2Nzk1MDc0OTV9.l5fWDLKuQwRkThQI8hlDKqzXWfNaZBc3O1Cj3M0y7pk').then((res) => console.log('this res', res))

loginWithApi('1').then(res => console.log('this api user', res))