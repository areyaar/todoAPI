const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const toDosRouter = require("./routes/todos");
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your front-end URL
    optionsSuccessStatus: 200,
  };

app.use(cors(corsOptions));


// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/todos", toDosRouter)


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
