let jwt = require("jsonwebtoken");

const SECRET_KEY = "lol";

const signToken = (payload) => jwt.sign(payload, SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { signToken, verifyToken };
