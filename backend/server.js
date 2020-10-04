const express = require('express');
const app = express();
//new code
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//end of new code

//executing mongodb connection
require('./config/db');

//importing user router
const userRouter = require('./src/routers/userRoute');

//importing feedback router
const feedbackRouter = require('./src/routers/feedbackRoute');

//importing category router
const categoryRouter = require('./src/routers/categoryRoute');

//importing products router
const furnitureRouter = require('./src/routers/products/furnitureRoute');//importing furniture router
const vehicleRouter = require('./src/routers/products/vehicleRoute');//importing vehicle router
const mobileRouter = require('./src/routers/products/mobileRoute');//importing vehicle router
const computerRouter = require('./src/routers/products/computerRoute');//importing vehicle router

//wishlist router
const wishlistRouter = require('./src/routers/wishlistRoute');

const chatRouter = require('./src/routers/chatRoute');
const SocketManager = require('./src/SocketManager');

const PORT = process.env.PORT || 5000;

app.use(express.json());

//User router
app.use(userRouter);

//Feedback router
app.use(feedbackRouter);

//category router
app.use(categoryRouter);

//products router
app.use(furnitureRouter); //furniture route
app.use(vehicleRouter); //vehicle route
app.use(mobileRouter); //mobile route
app.use(computerRouter); //computer route

//wishlist router
app.use(wishlistRouter);

app.use(chatRouter);

//kep app here instead of http to rollback
http.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})

io.on('connection', SocketManager); 

module.exports.io = io;
module.exports.http = http; //delete this line if app breaks after test




// var connections = [];
// var usersConnected = {};

// io.on('connection', (socket) => {
//     connections.push(socket);
//     console.log(`connected: ${connections.length} sockets connected`);

//     socket.on('new user connected', )

//     socket.on('disconnect', (data) => {
//         connections.splice(connections.indexOf(socket), 1);
//         console.log(`disconnected: ${connections.length} sockets connected`);
//     })


// })