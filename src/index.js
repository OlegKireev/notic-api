const express = require('express');

const app = express();
const port = process.env.port || 4000;

app.get('/', (req, res) => res.send('Hello Express'));
app.listen(port, () => console.log(`Server has been started at ${port} http://localhost:${port}`))