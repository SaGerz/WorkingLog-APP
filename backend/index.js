const express = require('express');
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
app.use('/api', taskRoutes)

app.listen(port, () => {
    console.log(`Example app was run on port ${port}`)
})