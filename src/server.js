import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`
========================================
Server Started Successfully
Environment : ${env.nodeEnv}
Port        : ${env.port}
========================================
`);
    });
  } catch (error) {
    console.error("Failed to start server.");
    console.error(error);

    process.exit(1);
  }
};

startServer();