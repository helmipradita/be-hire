const express = require('express');
const router = express.Router();
const UserRouter = require('../routes/user');

router.use('/auth', UserRouter);

module.exports = router;
