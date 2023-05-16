const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  create,
  login,
  checkToken,
};

// This function fires when a request is made to /api/users POST
async function create(req, res) {
  try {
    // Add the user to the database
    // then()
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

// async/wait new syntax for .then() aka thennables

async function login(req, res) {
  try {
    // Query our database to find a user with the email provided
    // Using filter object to find User with the given email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    // if we found the email, compare password
    // 1st argument from the credentials that the user typed in
    // 2nd argument what's stored in the database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    // if everything checks out, create token, login!
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

// controllers/api/users.js

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    // 1st arg
    { user },
    // 2nd arg
    process.env.SECRET,
    // 3rd arg
    { expiresIn: "24h" }
  );
}
