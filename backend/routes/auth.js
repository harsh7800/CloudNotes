const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Fetchuser= require('../middleware/Fetchuser')
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken"); 
const JWT_SECRET = "Harshisaverygood69boy";

//ROUTE 1 //Create a user using POST "/api/auth/createuser". No login needed
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be more than atleast 5 character").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user already exists with this email" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);


      //Create a new user
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken)
      //res.json(user)
      res.json({authToken});


    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server error");
    }
  }
);

//ROUTE 2 //Authenticate a User using POST "/api/auth/login" No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res 
          .status(400)
          .json({ error: "Please login with correct details" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please login with correct details" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server error");
    }
  }
);

// Router 3 : Get Loggedin User Details using : POST :"/api/auth/getuser". Login needed

router.post(
  "/getuser", Fetchuser , async (req, res) => { 
 
    try {
     let userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server error");
    }
  }
)
module.exports = router;
