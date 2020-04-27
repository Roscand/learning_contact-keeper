// dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

// router
const router = express.Router();

// models
const User = require('../models/User');

// @route   POST /api/users
// @desc    register a user
// @access  public
router.post('/', [
    check('name', 'Please enter your name.').not().isEmpty(),
    check('email', 'Please enter a valid email address.').isEmail(),
    check('password', 'Please enter a password 6 or more characters long.').isLength({min:6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        // get the passed values
        const { name, email, password } = req.body;
        try {
            // check if the user already exists
            let user = await User.findOne({ email });
            if (user) { return res.status(400).json({msg: 'User already exists.'}) };
            // create a new User object
            user = new User({
                name, 
                email, 
                password
            });
            // encrypt the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            // save the user to the db
            await user.save();
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
    };
});

module.exports = router;