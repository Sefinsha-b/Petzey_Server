const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const Vetroutes = require('./Routes/Vetapi');
const Petapiroutes = require('./Routes/Petapi');
const Appointmentroutes = require('./Routes/appointmentapi');
const Departmentroutes = require('./Routes/Departmentapi');
const Dummyroutes = require('./Routes/dummapi.js');

const allowedOrigins = ['https://petheaven-b9567.netlify.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['*'],
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/vets', Vetroutes);
app.use('/Pets', Petapiroutes);
app.use('/Appointments', Appointmentroutes);
app.use('/DepartMents', Departmentroutes);
app.use('/Dummy', Dummyroutes);

const dbUrl = process.env.DATABASE_URL; // Use the environment variable

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    res.status(403).json({ message: 'CORS error: Not allowed by CORS' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
