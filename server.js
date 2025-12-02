const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const os = require('os');
const spawn = require('cross-spawn');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from 'public' directory
app.use(express.static('public'));

// Shell to spawn (cmd.exe or powershell.exe on Windows)
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Spawn the shell
  const ptyProcess = spawn(shell, [], {
    cwd: process.env.HOME,
    env: process.env,
    stdio: ['pipe', 'pipe', 'pipe'] // Use pipes for stdin, stdout, stderr
  });

  // Send stdout to websocket
  ptyProcess.stdout.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data.toString());
    }
  });

  // Send stderr to websocket
  ptyProcess.stderr.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data.toString());
    }
  });

  // Receive data from websocket and write to stdin
  ws.on('message', (message) => {
    try {
        // Convert buffer to string if needed, though spawn.stdin.write handles buffers
        ptyProcess.stdin.write(message);
    } catch (e) {
        console.error('Error writing to process:', e);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    ptyProcess.kill();
  });
  
  ptyProcess.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      ws.close();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
