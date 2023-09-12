const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();
const port = process.env.PORT || 3000; // Set the port
const mongoose = require('mongoose');
const Vetroutes = require('./Routes/Vetapi');
const Petapiroutes = require('./Routes/Petapi');
const Appointmentroutes = require('./Routes/appointmentapi');
const Departmentroutes = require('./Routes/Departmentapi');
const Dummyroutes=require('./Routes/dummapi.js')

// Allow requests from http://localhost:4200
const allowedOrigins = ['http://localhost:4200','http://localhost:51714'];

// Configure CORS with specific origin(s) and methods
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // If the origin is in the allowed list or is undefined (e.g., a same-origin request), allow it
        callback(null, true);
      } else {
        // If the origin is not in the allowed list, reject the request
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['*'], // Allow all HTTP methods
  })
);



// Middleware
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/vets', Vetroutes);
app.use('/Pets', Petapiroutes);
app.use('/Appointments', Appointmentroutes);
app.use('/DepartMents', Departmentroutes);
app.use('/Dummy', Dummyroutes);


// MongoDB Connection Parameters
const dbUrl =
  'mongodb+srv://Sefin_clinis:N7zys0g7htbYFZ6W@cluster1.sulequc.mongodb.net/?retryWrites=true&w=majority';

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB Connection
mongoose
  .connect(dbUrl, connectionParams)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    // Optionally, exit the application or take other error-handling actions
  });

// Error Handling for CORS
app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    res.status(403).json({ message: 'CORS error: Not allowed by CORS' });
  } else {
    next(err);
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
