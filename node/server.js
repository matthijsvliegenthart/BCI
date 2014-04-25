/**
 * Created by matthijs_015 on 17-04-14.
 */
var http = require('http'),
    fs = require('fs');

var app = http.createServer(function (request, response) {
    fs.readFile("http://145.24.235.55/Business_Case_Innovation/V2/index.php", 'utf-8', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(1337);

var io = require('socket.io').listen(app);

var clients = {};
var route = {};
var markerCounter = 1;

io.sockets.on('connection', function(socket) {

    socket.on('message_to_server', function(data) {
        var name = socket.name;
        var role = socket.role;
        io.sockets.emit("message_to_client",{ message: data["message"], name: name , role : role});
    });

    socket.on('loginUser', function(data){
        socket.name = data['name'];
        socket.role = data['role'];

        var socketInfo = {};

        socketInfo.name = data['name'];
        socketInfo.role = data['role'];

        clients[socket.id] = socketInfo;
        io.sockets.emit("loginUser", { name: socket.name, role: socket.role});
        io.sockets.emit('getOnlineUsers', {clients: clients});
        io.sockets.emit('setRoute', {route: route});
    });

    socket.on('setLocation', function(data){
        clients[socket.id].lat = data['lat'];
        clients[socket.id].long = data['long'];
        io.sockets.emit('setMap', {clients: clients});
    });

    socket.on('addMarker', function(data){
        console.log(data);
        var markerInfo = {};
        markerInfo.id = data['id'];
        markerInfo.lat = data['lat'];
        markerInfo.long = data['long'];
        markerInfo.type = data['type'];
        route[markerCounter] = markerInfo;
        markerCounter++;
        io.sockets.emit('setRoute', {route: route});
    });

    socket.on('clearRoute', function(){
        delete route;
        route = {};
        markerCounter = 1;
        io.sockets.emit('setRoute', {route: route});
    });

    socket.on('startRoute', function(){
        io.sockets.emit('setRouteFunction', {route: route});
    });

    socket.on('disconnect', function(){
        delete clients[socket.id];
        io.sockets.emit("logoutUser", { name: socket.name, role: socket.role});
        io.sockets.emit('getOnlineUsers', {clients: clients});
    });
});