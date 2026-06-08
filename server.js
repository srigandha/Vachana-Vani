const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;

const server = http.createServer((req, res) => {
  // Parse URL and remove query string
  const parsedUrl = url.parse(req.url, true);
  let filepath = path.join(__dirname, parsedUrl.pathname === '/' ? 'Template.html' : parsedUrl.pathname);
  
  // Get file extension
  const ext = path.extname(filepath).toLowerCase();
  
  // Determine content type
  const contentTypes = {
    '.html': 'text/html',
    '.json': 'application/json',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  
  const contentType = contentTypes[ext] || 'application/octet-stream';
  
  // Read and serve file
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      console.log(`404: ${filepath}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
      console.log(`200: ${filepath}`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n✅ Server running at http://localhost:${PORT}/`);
  console.log(`\n📄 Test URLs:`);
  console.log(`   - http://localhost:${PORT}/Template.html?weekNumber=22&year=2026`);
  console.log(`   - http://localhost:${PORT}/Template.html?weekNumber=23&year=2026`);
  console.log(`\n📁 Data files:`);
  console.log(`   - vachana-data/poets.json`);
  console.log(`   - vachana-data/2026.json`);
  console.log(`   - vachana-data/week_name.json`);
  console.log(`\n⏹️  Press Ctrl+C to stop the server\n`);
});
