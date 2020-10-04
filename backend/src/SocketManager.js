const io = require('../server').io;

var connections = [];
var connectedUsers = {};

const { USER_CONNECTED, MESSAGE_SENT, MESSAGE_RECEIVED } = require('./SocketVariablesServer');

module.exports = (socket) => {
    connections.push(socket);
    console.log(`connected: ${connections.length} sockets connected`);

    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id;
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        console.log('Connected Users Length: ' + Object.keys(connectedUsers).length);
        // console.log(connectedUsers);
    })

    socket.on(MESSAGE_SENT, (messageData) => {
        const receiver = messageData.receiver;
        if(receiver in connectedUsers){
            const receiverSocket = connectedUsers[receiver].socketId;
            socket.to(receiverSocket).emit(MESSAGE_RECEIVED, messageData);
        }
    })

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log(`disconnected: ${connections.length} sockets connected`);

        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user._id);

            console.log('Connected Users Length:' + Object.keys(connectedUsers).length);
            // console.log(connectedUsers);
        }
    })
}

const addUser = (userList, user) => {
    let listNew = Object.assign({}, userList);
    listNew[user._id] = user;
    return listNew;
}

const removeUser = (userList, userId) => {
    let listNew = Object.assign({}, userList);
    delete listNew[userId];
    return listNew;
}