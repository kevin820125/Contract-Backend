  
const express = require('express');
var cors = require('cors')
const app = express();
require('dotenv').config();
let url = process.env.MONGODB_URI;
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error' , (error) => console.error(error))
db.once('open' , () => console.log("connected to database"))
app.use(express.json());


const user = require('./router/people.js')


app.use(cors())
app.use('/user' , user )


app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});


// module.exports = app