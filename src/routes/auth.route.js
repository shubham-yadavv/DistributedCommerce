const express = require("express");
const router = express.Router();

const {
    registerUserHandler,
    loginUserHandler,
    getMeHandler
} = require('../controllers/auth.controller');

const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/register', validate('createUser'), registerUserHandler);
router.post('/login', validate('loginUser'), loginUserHandler);
router.get('/me', auth, getMeHandler);

module.exports = router;

