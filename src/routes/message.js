const express = require(`express`);
const router = express.Router();
const { MessageController } = require(`../controller/message`);
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
let multer = require('multer');
let uploaded = multer();

//primary
router.post(
  '/:hire_id',
  uploaded.array(),
  protect,
  MessageController.addByHireId
);
router.get('/:hire_id', protect, MessageController.getListMessageById);

//public

module.exports = router;
