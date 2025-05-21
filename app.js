const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://karthikedhala:Dm44eOmR6AZkqtHF@cluster0.g9ocq8b.mongodb.net/aliensDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

app.use(express.json());

const alienRouter = require("./routes/aliens");
app.use("/aliens", alienRouter);

app.listen(8080, () => {
  console.log("Server started");
});
