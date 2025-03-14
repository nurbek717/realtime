const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname)); // Statik fayllar uchun

app.get("/", (req, res) => {
    res.sendFile(__dirname + "./index.html");
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

http.listen(3100, "0.0.0.0", () => {
    console.log("3100 porti ishga tushdi");
});
