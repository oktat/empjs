const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json())
 
require('./routes/index')(app);
require('./routes/api.routes')(app);

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
module.exports = app
