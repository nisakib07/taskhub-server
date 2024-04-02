import Jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  if (!req?.headers?.authorized) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }

  const token = req?.headers?.authorized;

  Jwt.verify(token, process.env.SECRET_TOKEN, (err, decoder) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.user = decoder;
    next();
  });
};

export default verifyToken;
