const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

// ✅ Apply Middleware Correctly
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", rootRouter); // Load routes


app.get("/", (req, res) => res.send("Hello World"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

