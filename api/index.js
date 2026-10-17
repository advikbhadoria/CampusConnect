/**
 * Vercel Serverless Function entry point for /api/*
 */

const { handleApi } = require('../server/apiHandler.js');

module.exports = async (req, res) => {
  const handled = await handleApi(req, res);
  if (!handled) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
  }
};
