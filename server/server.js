/**
 * ==============================================================================
 * CAMPUS CONNECT UNIFIED SERVER & STATIC FILE HOST
 * ==============================================================================
 * Serves:
 * 1. Base College Portals & Assets (HTML, JS, CSS, Media)
 * 2. API Gateway (Delegated to ./apiHandler.js - shared with Vercel Serverless)
 * ==============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { handleApi } = require('./apiHandler.js');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method;

  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-client-info');

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // --- API ROUTE HANDLERS (Shared with Vercel Serverless) ---
  if (pathname.startsWith('/api')) {
    const handled = await handleApi(req, res);
    if (handled) return;
  }

  // --- STATIC FILE SERVING ---
  let reqPath = pathname === '/' ? '/homepage/homepage.html' : pathname;
  
  // Normalize path & prevent directory traversal
  let safePath = path.normalize(path.join(ROOT_DIR, reqPath));
  if (!safePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  // If path is a directory, look for index.html
  if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
    const indexPath = path.join(safePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      safePath = indexPath;
    }
  }

  // Check file existence
  if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
    // Check if appending .html helps
    if (fs.existsSync(safePath + '.html')) {
      safePath = safePath + '.html';
    } else if (fs.existsSync(path.join(ROOT_DIR, 'Shops', reqPath))) {
      safePath = path.join(ROOT_DIR, 'Shops', reqPath);
    } else if (fs.existsSync(path.join(ROOT_DIR, 'Complain/dist', reqPath))) {
      safePath = path.join(ROOT_DIR, 'Complain/dist', reqPath);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 — Campus Connect</title></head>
        <body style="font-family:system-ui,sans-serif; text-align:center; padding:50px; background:#0b0f19; color:#f8fafc;">
          <h2>🎓 Campus Connect · 404 Not Found</h2>
          <p style="color:#94a3b8;">The requested campus route <code>${pathname}</code> does not exist.</p>
          <a href="/homepage/homepage.html" style="color:#38bdf8; text-decoration:none; font-weight:600;">← Return to Main Homepage</a>
        </body>
        </html>
      `);
    }
  }

  // Stream static file
  try {
    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const stat = fs.statSync(safePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
  } catch (err) {
    console.error('Error serving static file:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log('=======================================================');
  console.log(`🎓 CAMPUS CONNECT UNIFIED SERVER RUNNING AT:`);
  console.log(`   🔗 http://localhost:${PORT}`);
  console.log(`   🔗 http://localhost:${PORT}/homepage/homepage.html`);
  console.log(`   🏬 http://localhost:${PORT}/Shops/index.html`);
  console.log(`   📢 http://localhost:${PORT}/Complain/dist/index.html`);
  console.log(`   🤝 http://localhost:${PORT}/Borrow/dist/index.html`);
  console.log('=======================================================');
});
