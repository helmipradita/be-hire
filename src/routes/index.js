const express = require('express');
const router = express.Router();
const UserRouter = require('../routes/user');
const SkillRouter = require('../routes/skill');
const ExperienceRouter = require('../routes/experience');
const PortofolioRouter = require('../routes/portofolio');
const HireRouter = require('../routes/hire');
const MessageRouter = require('../routes/message');

const { UserController } = require(`../controller/user`);
const { protect } = require('../middleware/auth');

router.use('/auth', UserRouter);
router.use('/skill', SkillRouter);
router.use('/experience', ExperienceRouter);
router.use('/portofolio', PortofolioRouter);
router.use('/hire', HireRouter);
router.use('/message', MessageRouter);

//employee
router.get('/employee', UserController.employeeAll);
router.get('/employee/:id', protect, UserController.employeeById);

module.exports = router;
