const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Token missing", success: false });
    }
    
    jwt.verify(token, process.env.JWT_SECRET_USER, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ message: "Auth failed", success: false });
      } else {
        req.userId = decoded.id;

        next();
      }
    });
  } catch (error) {
    console.log(error);

    return res.status(401).send({ message: "Auth failed", success: false });
  }
};
