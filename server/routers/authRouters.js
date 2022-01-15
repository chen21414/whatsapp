const express = require("express")
const validateForm = require("../controllers/validateForm")
const router = express.Router() //a router provided by express
const pool = require("../db.js");
const bcrypt = require("bcrypt");


//here is /auth/login
router.post("/login", async (req, res) => {
    validateForm(req, res)

    const potentialLogin = await pool.query("SELECT id, username pashhash FROM users u WHERE u.username=$1", 
    [req.body.username]); //select username from users

    if(potentialLogin.rowCount > 0) {
        //fond good log in
        //if we found an account with the account the user typed in, then we compare the password
        const isSamePass = await bcrypt.compare(
            req.body.password, 
            potentialLogin.rows[0].passhash);

            if(isSamePass) {
                //login
                req.session.user = {
                    username:req.body.username,
                    id: newUserQuery.rows[0].id, //first row of the query
        
                } //the value of key of a dictionary is in cookies in index.js, value of the dictionary is whatever's in here
                  //the saved hi:'world' is saved in the session's server memory, will show next time, and we can edit it
                res.json({loggedIn: true, username})
            } else {
                //not good login
                console.log("not good")
                res.json({loggedIn: false, status: "Wrong username or password"});
            }

        } else {
            //if username is wrong, 
            console.log("not good")
            res.json({loggedIn: false, status: "Wrong username or password"});
        }


});

router.post("/signup", async (req, res) => {
   validateForm(req, res);

    const existingUser = await pool.query("SELECT username from users WHERE username=$1",
    [req.body.username] 
    );

    if(existingUser.rowCount === 0) {
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10); //10 is longer time to prevent hacker
        const newUserQuery = await pool.query(
            //in newUserQuery, we get username back
            "INSERT INTO users(username, passhash) value($1,$2) RETURNING id, username",
            [req.body.username, hashedPass]
        );
        console.log(newUserQuery);
        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id, //first row of the query

        } //the value of key of a dictionary is in cookies in index.js, value of the dictionary is whatever's in here
          //the saved hi:'world' is saved in the session's server memory, will show next time, and we can edit it
        res.json({loggedIn: true, username: req.body.username})
    } else {
        res.json({loggedIn:false, status: "Username taken"})
    }

});

module.exports = router;
