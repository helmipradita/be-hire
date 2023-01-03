const express = require('express');
const router = express.Router();
const UserRouter = require('../routes/user');
const SkillRouter = require('../routes/skill');

const { UserController } = require(`../controller/user`);
const { protect } = require('../middleware/auth');

router.use('/auth', UserRouter);
router.use('/skill', SkillRouter);

//employee
router.get('/employee', UserController.employeeAll);
router.get('/employee/:id', protect, UserController.employeeById);

module.exports = router;
