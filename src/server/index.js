const express = require('express');

const app = express();

const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});
const PORT = 4000;
app.get('/api', (req, res) => {
    res.send('<b>Hello World</b>')
});
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log(__dirname)

});