const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const userRouter = require("./routes/user")
const todoRouter = require("./routes/todo")
const cors = require("cors");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
