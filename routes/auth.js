const express = require('express');
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
router.post('/', (req, res) => {
    res.send('log in user');
});

module.exports = router;