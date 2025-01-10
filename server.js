const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const logsFile = 'logs.txt';

// Get logs
app.get('/logs', (req, res) => {
  if (fs.existsSync(logsFile)) {
    const logs = fs.readFileSync(logsFile, 'utf8');
    res.json(logs.split('\n').filter((log) => log !== ''));
  } else {
    res.json([]);
  }
});

// Save a new log
app.post('/logs', (req, res) => {
  const log = req.body.log;
  if (log) {
    fs.appendFileSync(logsFile, log + '\n');
    res.status(200).send('Log saved!');
  } else {
    res.status(400).send('No log provided.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
