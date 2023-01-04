const express = require(`express`);
const router = express.Router();
const { PortoController } = require(`../controller/portofolio`);
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
let multer = require('multer');
let uploaded = multer();

//primary
router.post(
  '/add',
  upload.single('photo'),
  protect,
  PortoController.addByUserId
);
router.get('/', protect, PortoController.getByUser);
router.get('/:id', protect, PortoController.getById);
router.put(
  '/:id',
  upload.single('photo'),
  protect,
  PortoController.editByUserId
);
router.delete(
  '/:id',
  uploaded.array(),
  protect,
  PortoController.deleteByUserId
);

//public

module.exports = router;
