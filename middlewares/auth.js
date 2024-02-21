const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).send("Access Denied. No token provided")
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
        // const decoded = jwt.verify(token,"jwtPrivateKey");
        req.user = decoded 
        next();
    } catch (error) {
        return res.status(400).send("Access Denied!..")
    }
}

module.exports = auth;

// 400 -- bad request
// 404 -- not found 
// 401 -- unauthorized
// 405 -- not created
// 403 --- forbidden
// 200 ---ok
// 201 --- created 
// 300 --- 
// 302 --- 
// 500 --- Server
// 502 -- coming from code
// 503 ---