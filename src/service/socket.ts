import { io } from "socket.io-client";

//const socket = io('http://localhost:5002',  { path: "/api/v2/socket/"})
const socket = io("http://localhost:3002", {
  path: "/api/socket/",
});

export default socket;
