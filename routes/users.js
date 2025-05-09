const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, skills, companyName } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (skills) user.skills = skills;
    if (companyName) user.companyName = companyName;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all freelancers
router.get('/freelancers', async (req, res) => {
  try {
    const freelancers = await User.find({ userType: 'freelancer' }).select('-password');
    res.json(freelancers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await User.find({ userType: 'client' }).select('-password');
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;