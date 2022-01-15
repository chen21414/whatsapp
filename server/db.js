//a package to connect postresql to node.js
const {Pool} = require("pg");
require("dotenv").config();

const pool = new Pool({
    //we dont want ppl to see here from github
    //npm i dotenv
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    

});

module.exports = pool;