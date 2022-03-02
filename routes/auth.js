const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require("../model/users");
const jwt = require("jsonwebtoken");
const secret = "abc";
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await userModel.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send("email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400);
  }
});

router.post("/login", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email not found");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid password");
  const payload = { user: user._id };

  const token = jwt.sign(payload, secret, { expiresIn: "30m" });

  res.header("auth-token", token).status(201).send(token);
});

module.exports = router;
