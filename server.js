const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json())
 
require('./routes/index')(app);
require('./routes/api.routes')(app);

app.use(bodyParser.json())
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
module.exports = app
