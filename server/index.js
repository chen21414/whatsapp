const express = require("express");
const {Server} = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors") 
const authRouter = require("./routers/authRouters");
const session = require("express-session")
const server = require("http").createServer(app);
require("dotenv").config();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: "true",

    },
});

app.use(helmet()); //for security 
app.use(cors({
    //to receive from other domain
    //if don't specify the origin, it will think everyone can communicate front and backend
    origin: "http://localhost:3000",
    credentials: true,


}))
app.use(express.json()); //received JSON and treat like JS object
app.use(session({
    secret: process.env.COOKIE_SECRET, //cookies(like code), gets user information from that cookies
    credentials: true,
    name: "sid", //session id
    resave: false,
    saveUninitialized: false, //we don't want to set cookie on the browser if user hasn't logged in
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto", //secure means only set through https, but we are using http,"production" allows us to use http; auto is default option
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax", //sameSite will only communicate bw same domain
        
    }
}))
app.get('/auth', authRouter); //any request sends to the root slash auth, we are going to use middleware authRouter

io.on("connect", socket => {});

server.listen(4000, ()=>{
    console.log("Server listening on port 4000");
})



