const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const filename = 'Test.zip';

app.use(cors());

app.get('/downloadFile', async (req, res) => {
  res.download(filename);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});