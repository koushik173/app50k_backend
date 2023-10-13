const cookieParser = require('cookie-parser')
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRouter = require('./routes/userRoutes');
app.use('/api', userRouter);

app.get('/', (req, res) => {
    res.send('hello from roy home');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
