const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  if (token.expiredAt) res.send(401).send("Token Expired");
  try {
    const verified = jwt.verify(token, "abc");
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
