require('dotenv').config({path:'./.env'});
const express = require('express');
const authroutes = require('./Routes/authRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5001;

// app.get('/', (req, res) => {
//     res.send(
//         'Hello world'
//     );
// })

app.use(bodyParser.json());

app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT','DELETE'],
    credentials: true
}))

app.use('/auth', authroutes);
app.use('/api', taskRoutes);

app.get('/test', (req, res) => {
    res.send('Test successful');
});

app.listen(port, () => {
    console.log(`Example app was run on port ${port}`)
})