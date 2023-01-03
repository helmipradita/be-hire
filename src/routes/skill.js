const express = require(`express`);
const router = express.Router();
const { SkillController } = require(`../controller/skill`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let upload = multer();

//primary
router.post('/add', upload.array(), protect, SkillController.addByUserId);
router.get('/', protect, SkillController.getByUser);
router.get('/:id', protect, SkillController.getByUserId);
router.put('/:id', upload.array(), protect, SkillController.editByUserId);
router.delete('/:id', upload.array(), protect, SkillController.deleteByUserId);

//public
router.get('/all', SkillController.getAll);

module.exports = router;
