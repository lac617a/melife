import { io } from "socket.io-client";

//const socket = io('http://localhost:3002',  { path: "/api/v2/socket/"})
const socket = io("https://melife-backend-production.up.railway.app", {
  path: "/api/socket/",
});

export default socket;
