const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { registerValidation, loginValidation } = require('../utils/validation');

exports.register = async (req, res, next) => {
  const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({ message: 'Email already exists' });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Email is not found' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token: token });
};