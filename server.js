const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const urlDatabase = {}; // In-memory database for URL mapping

// Create a random short code
const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8); 
};

// Redirect short URL to original
app.get('/:shortCode', (req, res) => {
  const shortCode = req.params.shortCode;
  const originalUrl = urlDatabase[shortCode];
  if (originalUrl) {
    return res.redirect(originalUrl);
  }
  res.status(404).send('URL not found');
});

// Create a new short URL
app.use(express.json());
app.post('/shorten', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }
  const shortCode = generateShortCode();
  urlDatabase[shortCode] = url;
  res.send({ shortUrl: `https://${req.headers.host}/${shortCode}` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
