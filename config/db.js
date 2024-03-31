import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "taskHub",
    });

    console.log(`connected : ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

export default connectDB;
