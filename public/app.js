const term = new Terminal({
    cursorBlink: true,
    macOptionIsMeta: true,
    scrollback: 1000,
    theme: {
        background: '#0c0c0c',
        foreground: '#cccccc',
        cursor: '#ffffff',
        selection: '#5da5d533',
        black: '#0c0c0c',
        red: '#c50f1f',
        green: '#13a10e',
        yellow: '#c19c00',
        blue: '#0037da',
        magenta: '#881798',
        cyan: '#3a96dd',
        white: '#cccccc',
        brightBlack: '#767676',
        brightRed: '#e74856',
        brightGreen: '#16c60c',
        brightYellow: '#f9f1a5',
        brightBlue: '#3b78ff',
        brightMagenta: '#b4009e',
        brightCyan: '#61d6d6',
        brightWhite: '#f2f2f2'
    },
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: 14
});

const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);

term.open(document.getElementById('terminal-container'));
fitAddon.fit();

const ws = new WebSocket(`ws://${window.location.host}`);

ws.onopen = () => {
    console.log('Connected to WebSocket');
    // Send initial resize
    // ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }));
};

ws.onmessage = (event) => {
    term.write(event.data);
};

term.onData((data) => {
    ws.send(data);
});

// Handle window resize
window.addEventListener('resize', () => {
    fitAddon.fit();
    // Ideally send resize to server, but simple pty might just wrap.
    // To implement resize properly, we need a protocol message, not just raw data.
    // For this MVP, we'll stick to raw data for simplicity, 
    // but if we wanted resize, we'd need to wrap data in JSON or use a binary protocol.
});
