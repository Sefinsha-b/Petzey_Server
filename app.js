const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Set the port
const Vetroutes = require('./Routes/Vetapi');
const Petapiroutes = require('./Routes/Petapi');
const Appointmentroutes = require('./Routes/appointmentapi')
const Departmentroutes = require('./Routes/Departmentapi')
const mongoose = require('mongoose');

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






// ///////////////////////////////////////////

const dbUrl = "mongodb+srv://Sefin_clinis:N7zys0g7htbYFZ6W@cluster1.sulequc.mongodb.net/?retryWrites=true&w=majority"


const connectionParams = {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
};

mongoose
    .connect(dbUrl, connectionParams)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
