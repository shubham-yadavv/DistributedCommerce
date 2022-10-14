const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const gravatar = require("gravatar");

const User = require("../models/User");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { name, email, password } = req.body;
  try {
    // See if user exists
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }
    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    user = new User({
      name,
      email,
      avatar,
      password,
    });
    // Encrypt password
    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(password, salt);
    await user.save();
    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    // See if user exists
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }
    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
}

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
}
