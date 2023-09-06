const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Token missing", success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Auth failed", success: false });
      } else {
        req.adminId = decoded.id,
           next();
      }
    });
  } catch (error) {
    return res.status(401).send({ message: "Auth failed", success: false });
  }
};
