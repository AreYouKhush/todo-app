const mongoose = require("mongoose");
require('dotenv').config()

// Connect to MongoDB
mongoose.connect(
    process.env.DB_URI
);

// Define schemas
const UserSchema = new mongoose.Schema({
  // Schema definition here
  name: String,
  username: {
    type: String,
    required: true, // Ensures that the field is not null
    unique: true,  // Ensures that the field is unique
  },
  password: String,
});

const TodoSchema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    editMode: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model("Todo", TodoSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  Todo,
  User
};
