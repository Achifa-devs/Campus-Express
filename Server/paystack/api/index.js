const app = require('../app');

// Vercel Serverless Function entrypoint wrapping the Express app
// This allows the app to run on Vercel's serverless platform.
module.exports = (req, res) => {
  return app(req, res);
};