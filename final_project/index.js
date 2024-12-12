const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
    // Middleware which tells that the user is authenticated or not
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // Access Token

        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next();
            }
            else {
                return res.status(403).json({ message: "User not authenticated" })
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" })
    }
});

// Main endpoint to be accessed by authenticated users
app.get("/auth/get_message", (req, res) => {
  return res.status(200).json({ message: "Hello, You are an authenticated user. Congratulations!" });
});
 
const PORT =5005;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
