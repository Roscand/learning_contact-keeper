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
        // try to find all user's contacts
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        
        // respond with the array of contacts if found
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    };
});

// @route   POST /api/contacts
// @desc    add a new contact
// @access  private
router.post('/', [ 
    auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {

    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({errors: errors.array()}); };

    // destructure the input
    const { name, email, phone, type } = req.body;
    try {

        // construct a new contact
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        // save the contact to the db
        const contact = await newContact.save();

        // send the contact back to user
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    };
});

// @route   PUT /api/contacts/:id
// @desc    update the contact
// @access  private
router.put('/:id', auth, async (req, res) => {
    // destructure the input
    const { name, email, phone, type } = req.body;
    // build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        // try to find the contact by id
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({msg: 'Contact not found.'});

        // check if the current user has rights to edit
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorised.'});
        };

        // update the contact
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true});

        // return the updated/new contact
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    };
});

// @route   DELETE /api/contacts/:id
// @desc    delete the contact
// @access  private
router.delete('/:id', auth, async (req, res) => {
    try {
        // try to find the contact by id
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({msg: 'Contact not found.'});

        // check if the current user has rights to delete
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorised.'});
        };

        // delete the contact
        await Contact.findByIdAndRemove(req.params.id);

        // return the updated/new contact
        res.json({msg: 'Contact removed.'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    };
});

module.exports = router;