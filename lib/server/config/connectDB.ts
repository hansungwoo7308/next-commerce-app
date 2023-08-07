import mongoose from "mongoose";
export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return console.log("readyState");
  const config = {
    dbName: "test",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  try {
    await mongoose.connect(process.env.MONGODB_URI, config);
  } catch (error) {
    console.log(error);
  }
}

// export default async function connectDB() {
//   if (mongoose.connections[0].readyState) {
//     // console.log("\n\x1b[33mMongoDB is already connected");
//     return;
//   }
//   try {
//     const options = {
//       dbName: "test",
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       // bufferCommands: false,
//     };
//     await mongoose.connect(process.env.MONGODB_URI, options);
//     // console.log("\n\x1b[33mMongoDB connected");
//   } catch (error) {
//     console.log("\n\x1b[31mMongoDB error");
//     console.log(error);
//   }
// }
