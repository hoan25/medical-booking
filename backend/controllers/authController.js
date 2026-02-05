const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id, role) => {
  return jwt.sign({ id, role }, 'secret_key_change_this', { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    const { email, password, fullName, phone, role } = req.body;
    const user = new User({ email, password, fullName, phone, role });
    await user.save();
    const token = signToken(user._id, user.role);
    res.status(201).json({ token, user: { id: user._id, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Sai email/mật khẩu' });
    }
    const token = signToken(user._id, user.role);
    res.json({ token, user: { id: user._id, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};