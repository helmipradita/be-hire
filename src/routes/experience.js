const express = require(`express`);
const router = express.Router();
const { ExpController } = require(`../controller/experience`);
const { protect } = require('../middleware/auth');
let multer = require('multer');
let upload = multer();

//primary
router.post('/add', upload.array(), protect, ExpController.addByUserId);
router.get('/', protect, ExpController.getByUser);
router.get('/:id', protect, ExpController.getById);
router.put('/:id', upload.array(), protect, ExpController.editByUserId);
router.delete('/:id', upload.array(), protect, ExpController.deleteByUserId);

//public

module.exports = router;
