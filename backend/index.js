require('dotenv').config({path:'./.env'});
const express = require('express');
const authroutes = require('./Routes/authRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const app = express();
const bodyParser = require('body-parser');

const port = 5000;

// app.get('/', (req, res) => {
//     res.send(
//         'Hello world'
//     );
// })

app.use(bodyParser.json());

app.use('/auth', authroutes);
app.use('/api', taskRoutes);

app.listen(port, () => {
    console.log(`Example app was run on port ${port}`)
})