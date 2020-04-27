// dependencies
const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

// models
const User = require('../models/User');

// router
const router = express.Router();

// @route   Get /api/auth
// @desc    get a logged in user
// @access  private
router.get('/', (req, res) => {
    res.send('get a logged in user');
});

// @route   POST /api/auth
// @desc    log in user & get a token
// @access  public
router.post('/', [
    check('email', 'Please enter your valid email.').isEmail(),
    check('password', 'Please enter a valid password.')
], async (req, res) => {
    // validate the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({errors: errors.array()}) };

    // deconstruct the input
    const { email, password } = req.body;

    try {
        // check if the user exists
        let user = await User.findOne({ email });
        if (!user) { 
            return res.status(400).json({ msg: 'Invalid Credentials' });
        };

        // check if the passwords match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        };

        // respond with the token
        const payload = { user: { id: user.id } };
        const options = { expiresIn: 1000 * 60 * 60 };
        jwt.sign(payload, config.get('jwtSecret'), options, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    };
});

module.exports = router;