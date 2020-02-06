const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

// @route   GET api/todo
// @desc    This will return all of user's todos
// @acess   Private
router.get('/', auth, async (req, res) => {
    res.send('Todo route hit!');
});

module.exports = router;