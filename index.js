const dotenv = require('dotenv');
dotenv.config();

const relate = require('./database/relationships');
relate();

const {
  loginWithEmailPassword,
  loginWithToken,
  loginWithApi
} = require('./authent');

const {
  authouRIzeByIsAdmin,
  authouRIzeByhasToken,
  authouRIzeByhasApikey
} = require('./authorize');

// loginWithEmailPassword('rash23307@gmail.com', '1234').then((res) => console.log(res));

loginWithToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYXJlcl9pZCI6MTcsImJhcmVyX2VtYWlsIjoicmFzaDIzMzA3QGdtYWlsLmNvbSIsImlhdCI6MTY3OTU3OTA3MywiZXhwIjoxNjc5NTgyNjczfQ.rZX1UYfXozWWFKHgW9sau4umBl15R16Kr9YVvK67-HQ').then((res) => console.log(res));

// loginWithApi('1').then(res => console.log('this api user', res))


authouRIzeByIsAdmin({
  id: 17,
  first_name: 'RashFo',
  last_name: 'ora',
  password: '1234',
  email: 'rash23307@gmail.com',
  phone: 67011,
  is_admin: false
}, console.log);

// authouRIzeByhasToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYXJlcl9pZCI6MTcsImJhcmVyX2VtYWlsIjoicmFzaDIzMzA3QGdtYWlsLmNvbSIsImlhdCI6MTY3OTU3OTA3MywiZXhwIjoxNjc5NTgyNjczfQ.rZX1UYfXozWWFKHgW9sau4umBl15R16Kr9YVvK67-HQ', console.log)

// authouRIzeByhasApikey(1, console.log)