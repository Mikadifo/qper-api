import express from "express";
import cors from "cors";
import setUpSwagger from "./config/swagger.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import routes from "./api/index.js";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
setUpSwagger(app);
app.use("/api", routes);
app.use(errorHandler);
app.listen(8000, () => {
    console.log("Listening on port 8000...");
});
