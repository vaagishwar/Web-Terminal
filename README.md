# Web Terminal Clone

A web-based terminal emulator that acts as a proxy to your local Windows command line. It allows you to run commands and interact with your shell directly from a web browser, mimicking the look and feel of Windows Terminal.

<img width="1918" height="950" alt="Screenshot 2025-12-02 200957" src="https://github.com/user-attachments/assets/38766c06-a59b-44da-92af-ac9aaf40f921" />



## Features

*   **Web Interface**: A clean, dark-themed terminal UI built with `xterm.js`.
*   **Real-time Communication**: Uses WebSockets (`ws`) for instant command execution and output streaming.
*   **Shell Proxy**: Executes commands on the host machine using `cross-spawn` (supports `powershell.exe` or `cmd.exe`).
*   **Responsive Design**: Fits the browser window and handles resizing.
*   **Windows Terminal Aesthetics**: Styled with a dark background and custom scrollbars.

## Prerequisites

*   Node.js (v14 or higher)
*   npm (Node Package Manager)

## Installation

1.  Clone the repository (or download the source code):
    ```bash
    git clone https://github.com/vaagishwar/Web-Terminal.git
    cd web-terminal
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Start the server:
    ```bash
    npm start
    ```

2.  Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

3.  Start typing commands! (e.g., `dir`, `echo hello`, `ver`)

## Technologies Used

*   **Backend**: Node.js, Express, WebSocket (`ws`), `cross-spawn`
*   **Frontend**: HTML5, CSS3, JavaScript, `xterm.js`, `xterm-addon-fit`

## Notes

*   **Security Warning**: This application exposes your local shell to the web interface. It is intended for **local use only**. Do not deploy this to a public server without adding authentication and security measures.
*   **Interactive Commands**: Due to the use of `cross-spawn` (instead of `node-pty` for better Windows compatibility without native build tools), some highly interactive TTY-based applications (like `vim` or interactive Python shells) may have limited functionality.

## License

ISC
https://github.com/vaagishwar/Web-Terminal.git

⭐ Star this repository if you found it useful!

[![GitHub stars](https://img.shields.io/github/stars/vaagishwar/Web-Terminal?style=social)](https://github.com/vaagishwar/Web-Terminal/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/vaagishwar/Web-Terminal?style=social)](https://github.com/vaagishwar/Web-Terminal/network/members)

