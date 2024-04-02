import app from "../../app.js";
import express from "express";

import Users from "../../models/users.js";
import verifyToken from "../../jwt/middleware/auth.js";
import Tasks from "../../models/tasks.js";

const allRoutes = () => {
  app.use(express.json());

  app.post("/register", async (req, res) => {
    try {
      const { name, email, userImage } = req.body;
      if (!name || !email) {
        return res
          .status(400)
          .json({ message: "Please provide all requirements" });
      }

      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        return res.send("Email already in use");
      }

      const newUser = new Users({ name, email, userImage });

      const result = await newUser.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

app.post("/add-tasks", verifyToken, async (req, res) => {
  try {
    const { title, description, deadline, email } = req.body;

    const newTask = new Tasks({ title, description, deadline, email });

    const result = await newTask.save();

    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/tasks-num", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const result = await Tasks.find({
      email: userEmail,
      status: "pending",
    }).countDocuments();
    console.log(result);
    res.send({ total: result });
  } catch (error) {
    res.send("Something wrong");
  }
});

app.get("/pendingTasks", verifyToken, async (req, res) => {
  try {
    const skipFrom = req.query.skip;
    const userEmail = req.query.email;
    const result = await Tasks.find({
      email: userEmail,
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .skip(skipFrom)
      .limit(4);

    res.send(result);
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

app.get("/singleTask/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Tasks.findOne({ _id: id });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

app.delete("/deleteTask/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Tasks.deleteOne({ _id: id });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/editTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = req.body;

    const result = await Tasks.updateOne(
      { _id: id },
      { $set: updatedTask },
      { upsert: true }
    );

    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

export default allRoutes;
