const prod = process.env.NODE_ENV === 'production';

// note, the following keys are for the frontend and can be seen by the public, 
// you can place private keys in .env file and access them in the server
module.exports = {
  'process.env.BACKEND_URL': prod ? 'YOUR_PRODUCTION_URL' : 'http://localhost:3001',
  'process.env.NODE_ENV' : prod ? 'production' : 'development'
};