const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function auth(req, res, next)
{
    const token = res.header('token');
    if(!token) return res.redirect('./login_invalid.html')
        .status(401);

    try 
    {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    } 
    catch (error) 
    {
        req.status(400).redirect('./login_invalid.html');    
    }
}