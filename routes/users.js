// dependencies
const express = require('express');
const { check, validationResult } = require('express-validator/check');

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
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        res.send("Validation passed.");
    };
});

module.exports = router;