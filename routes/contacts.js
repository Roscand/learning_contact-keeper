// dependencies
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// models
const User = require('../models/User');
const Contact = require('../models/Contact');

// middleware
const auth = require('../middleware/auth');

// ROUTES
// @route   GET /api/contacts
// @desc    get all user's contacts
// @access  private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    };
});

// @route   POST /api/contacts
// @desc    add a new contact
// @access  private
router.post('/', (req, res) => {
    res.send('add a new contact');
});

// @route   PUT /api/contacts/:id
// @desc    update the contact
// @access  private
router.put('/:id', (req, res) => {
    res.send('update the contact');
});

// @route   DELETE /api/contacts/:id
// @desc    delete the contact
// @access  private
router.delete('/:id', (req, res) => {
    res.send('delete the contact');
});

module.exports = router;