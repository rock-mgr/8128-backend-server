const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();

const cors = require("cors");
app.use(cors());


//enable JSON in req.body otherwise req.body will be undefined
// express.json() is a middleware - all requests are passed through middlewares before it reaches the route function
// they usually pre-process the request
app.use(express.json());

// route 
// a route is a URL fragment assoc with a function
// when a client tries to access /about us on the server
// call the function in the second arguement
app.get('/', function(req,res){
    res.send("home/root URL called");
})

app.get('/about us', function(req,res){
    // req = request (whatever the client is sending to the server)
    // res = response (whatever the server wants to send back to the client)
    res.send ("hello world");
})

// get data from client via route parameters
app.get('/hello/:firstName', function(req,res){
    const firstName = req.params.firstName;
    res.send("Hi "+firstName);
})

// there is nowhere at all to state the expected query string parameters
// if the client sends any query string, it will be in req.query
// maybe the search can receive a name, startDate and endDate query parameter
// example: ?name=IBM&startDate=2026-09-07&endDate=2026-10-07
app.get('/search', function(req,res){
    const name = req.query.name;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    res.json ({
        name, startDate, endDate
    })
})

// app.post, app.patch and app.put data can be received via req.body
// those are usually used for create and updates
// req.body can support file uploads, arrays, object arr
app.post('/register', function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    res.send(`Email ${email} is registered with the password ${password}`);
})

app.get('/b/:binID/latest', async function(req,res){
    const response = await axios.get(`${process.env.JSON_BIN_URL}/b/${req.params.binID}`,{
        headers:{
            "Content-Type": "application/json",
            "X-Master-Key": process.env.X_MASTER_KEY
        }
    })
    res.json(response.data);
})

app.listen(3000, function(){
    console.log("server has started");
})

app.put('b/:binID',async function(req,res){
    const response = await axios.put(`${process.env.JSON_BIN_URL}/b/${req.params.binID}/latest`,req.body,{
        headers: {
            "Content-Type":"application/json",
            "X-Master-Key": process.env.X_MASTER_KEY
        }
    });

    // MUST ALWAYS SEND RESPONSE
    res.json(response.data);
})