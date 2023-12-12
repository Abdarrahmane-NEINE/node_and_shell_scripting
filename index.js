const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
     //  CORS headers
     res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST'); // Allow specific HTTP methods
 
    if (req.url === '/run') {
        exec('sh hello.sh', (error, stdout, stderr) => {
            if (error) {
                res.writeHead(500);
                res.end('Error executing the script');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(stdout);
            console.log(stdout)
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});