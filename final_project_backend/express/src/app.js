const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let taxiSocket = null;
let passengerSocket = null;

io.on("connection", (socket) => {
  console.log("a user connected to socket", socket.id);

  socket.on("rideRequest", (rideDetails) => {
    console.log("Someone is looking for a ride!", socket.id);
    passengerSocket = socket;

    if (taxiSocket != null) {
      console.log(rideDetails);
      taxiSocket.emit("rideRequest", rideDetails);
    }
  });

  socket.on("lookingForPassengers", () => {
    console.log("Looking for passengers!", socket.id);
    taxiSocket = socket;
  });

  socket.on("acceptRide", (driverDetails) => {
    console.log(driverDetails);
    passengerSocket.emit("acceptRide", driverDetails);
  });

  socket.on("rideFinished", () => {
    passengerSocket.emit("rideFinished");
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "Disconnected");
  });
});

server.listen(3001, () => console.log("server running on port 3001..."));