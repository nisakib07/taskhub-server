import app from "../../app.js";
import express from "express";

import Users from "../../models/users.js";

const allRoutes = () => {
  app.use(express.json());

  app.post("/register", async (req, res) => {
    try {
      const { name, email, password, userImage } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide all requirements" });
      }

      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        return res.send("Email already in use");
      }

      const newUser = new Users({ name, email, password, userImage });

      const result = await newUser.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default allRoutes;
