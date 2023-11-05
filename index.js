const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routers");
const errorHandling = require("./middlewares/errorHandling");

require("dotenv").config();

app.use(express.json({ strict: false }));
app.use(cors());

// Router utama
app.use("/api/v1", router);

// Error handling
app.use(errorHandling);

// Handle 404 route
app.get("*", (req, res) => {
  return res.status(404).json({
    error: "End point is not registered",
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
