const express = require('express');
const getBbcNews = require('./bbc.js'); // Assuming getBbcNews.js is in the same directory
const getNyNews = require('./nytimes.js')

const app = express();
const port = 3000; // Change this to your desired port

app.get('/bbc', async (req, res) => {

  try {
    const newsData = await getBbcNews();
    res.json(await newsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/nytimes', async (req, res) => {

  try {
    const newsData = await getNyNews();
    res.json(await newsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
