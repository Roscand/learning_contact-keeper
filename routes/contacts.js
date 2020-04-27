const express = require('express');
const router = express.Router();

// @route   GET /api/contacts
// @desc    get all user's contacts
// @access  private
router.get('/', (req, res) => {
    res.send('get all my contacts');
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