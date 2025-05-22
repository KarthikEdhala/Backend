const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectToMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Mongo already connected");
    return;
  }

  await mongoose.connect(
    "mongodb+srv://karthikedhala:Dm44eOmR6AZkqtHF@cluster0.g9ocq8b.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log("✅ Mongo connected now");
};

// ✅ Attach DB connection before each Lambda request
app.use(async (req, res, next) => {
  await connectToMongo();
  next();
});

app.use(express.json());

const alienRouter = require("./routes/aliens");
app.use("/aliens", alienRouter);

app.listen(8080, () => {
  console.log("Server started");
});
