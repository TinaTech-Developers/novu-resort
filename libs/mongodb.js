import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOBD_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.log(error, "Unable to connect to your db");
  }
};

export default connectMongoDB;
