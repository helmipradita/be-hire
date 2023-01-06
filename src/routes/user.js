const express = require(`express`);
const router = express.Router();
const { UserController } = require(`../controller/user`);
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
let multer = require('multer');
let uploaded = multer();

//auth
router.post('/register/:role', uploaded.array(), UserController.register);
router.post('/verification', uploaded.array(), UserController.verif);
router.post('/login', uploaded.array(), UserController.login);
router.get('/profile', protect, UserController.profile);

router.put(
  '/update-company',
  upload.single('photo'),
  protect,
  UserController.updateCompany
);
router.put(
  '/update-employee',
  upload.single('photo'),
  protect,
  UserController.updateEmployee
);

module.exports = router;
