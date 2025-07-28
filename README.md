# OPCUA Project

This project connects an LS PLC to a web dashboard using OPC UA. The backend
uses Node.js and the [`node-opcua`](https://github.com/node-opcua/node-opcua)
library to communicate with the PLC. A React frontend displays current values
and can write new values back to the PLC. Logged events may optionally be stored
in Firebase.

## Project Structure

```
backend/   Node.js server (Express + node-opcua)
frontend/  React application (Vite)
```

## Setup

### Backend
1. Install dependencies
   ```bash
   cd backend
   npm install
   ```
2. Start the server (default port `3000`)
   ```bash
   npm start
   ```
   Set `OPCUA_ENDPOINT` if your PLC has a different endpoint URL.

### Frontend
1. Install dependencies
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```

## Example API Usage

Reading and writing a tag can be done via HTTP requests:

```bash
# Read tag ns=2;s=A
curl http://localhost:3000/tags/ns=2;s=A

# Write value true to tag ns=2;s=A
curl -X POST -H "Content-Type: application/json" \
  -d '{"value": true}' \
  http://localhost:3000/tags/ns=2;s=A
```

These endpoints internally use `node-opcua` to communicate with the PLC.

---

This repository currently contains only the starter template. You can extend the
backend and frontend to build a full dashboard that visualizes PLC values and
stores logs in Firebase.
