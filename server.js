const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://balokdecoy:Picard5488@cluster0.bunww.mongodb.net/budget?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(() => {
  console.log('connected')
}).catch(error => {
  console.log(error);
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html-routes.js"))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
