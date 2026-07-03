import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

//  Global Middlewares


app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));


//  Health Check


app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running."
  });
});


//  API Routes


app.use("/api/v1", routes);


// | 404 not found 


app.use(notFoundMiddleware);


//  Error Handler


app.use(errorMiddleware);

export default app;