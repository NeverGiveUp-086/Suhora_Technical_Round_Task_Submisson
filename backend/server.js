const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/error');

require('dotenv').config({path: './config/config.env'});
const connectDatabase = require('./config/firebase');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);

app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
    }
);
