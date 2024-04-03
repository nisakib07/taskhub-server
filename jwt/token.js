import Jwt from "jsonwebtoken";
import app from "../app.js";

const CreateToken = () => {
  app.post("/jwt", async (req, res) => {
    const user = req.body;
    const token = Jwt.sign(user, process.env.SECRET_TOKEN, {
      expiresIn: "10h",
    });
    res.send({ token });
  });
};

export default CreateToken;
