const express = require('express');
const router = express.Router();
const UserRouter = require('../routes/user');
const SkillRouter = require('../routes/skill');

router.use('/auth', UserRouter);
router.use('/skill', SkillRouter);

module.exports = router;
