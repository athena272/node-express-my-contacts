require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3000, () => console.log('🔥 Server on fire 🔥 at http://localhost:3000'));
