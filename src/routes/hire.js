const express = require(`express`);
const router = express.Router();
const { HireController } = require(`../controller/hire`);
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
let multer = require('multer');
let uploaded = multer();

//primary
router.post(
  '/add/:employee_id',
  uploaded.array(),
  protect,
  HireController.addByEmployeeId
);
router.get('/all', protect, HireController.getAllHire);
router.get('/', protect, HireController.getByUserId);

//public

module.exports = router;
