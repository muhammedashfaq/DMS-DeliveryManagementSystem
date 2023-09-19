
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Token missing or invalid", success: false });
    }

    const tokenValue = token.split(" ")[1];

    jwt.verify(tokenValue, process.env.JWT_SECRET_USER, (err, decoded) => {
      if (err || decoded.role !== "USER") {
        return res.status(401).json({ message: "Authentication failed", success: false });
      }

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};
