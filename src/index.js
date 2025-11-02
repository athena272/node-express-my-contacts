require('express-async-errors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
    console.log('### Error Handler ###');
    console.log(error);
    res.send(500);
});

app.listen(3000, () => console.log('🔥 Server on fire 🔥 at http://localhost:3000'));
