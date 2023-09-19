const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Token missing or invalid", success: false });
    }

    const tokenValue = token.split(" ")[1];

    jwt.verify(tokenValue, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
      if (err || decoded.role !== "ADMIN") {
        return res.status(401).send({ message: "Authentication failed", success: false });
      } else {
        req.adminId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};
