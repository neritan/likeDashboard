const express = require('express');
require('./src/config/mongoose.config');
const cors = require('cors');
const likeRoute = require('./src/routes/likeRoute')

const app = express();

app.use(
    cors(),
    express.json(),
    express.urlencoded({extended: true})
);

app.use(likeRoute);
const port = process.env.PORT || 3090;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});