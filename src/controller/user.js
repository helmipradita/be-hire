const { response } = require(`../middleware/common`);
const {
  registerUser,
  findEmail,
  insertEmployee,
  insertCompany,
  updateCompany,
  updateEmployee,
  findEmployee,
  findCompany,
  findUsers,
  profileCompany,
  profileEmploye,
  verif,
  allEmployee,
} = require(`../model/user`);
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {
  generateToken,
  generateRefreshToken,
  decodeToken,
} = require(`../helpers/auth`);
const email = require('../middleware/email');
const cloudinary = require('../config/photo');

const Port = process.env.PORT;
const Host = process.env.HOST;

const UserController = {
  register: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (users) {
      return response(res, 404, false, 'email already use', ' register fail');
    }

    // create otp
    let digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    const id = uuidv4();
    const role = req.params.role;
    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password,
      role,
      otp,
    };
    let profile = {
      id,
      company_name: req.body.company_name,
      position: req.body.position,
    };
    try {
      if (role === 'company') {
        await insertCompany(profile);
      } else if (role === 'employee') {
        await insertEmployee(profile);
      } else {
        return response(
          res,
          404,
          false,
          null,
          'Wrong Role Input, Check it again'
        );
      }
      const result = await registerUser(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let text = `Hello ${req.body.name} \n Thank you for join us arutala hireapp. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == 'email not sent!') {
          return response(res, 404, false, null, 'register fail');
        }

        response(
          res,
          200,
          true,
          { email: data.email },
          'register success please check your email'
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, ' register fail');
    }
  },
  verif: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 404, false, null, 'email not found');
    }

    if (users.otp == otp) {
      await verif(email);
      return response(
        res,
        200,
        true,
        req.body.email,
        'verification account success'
      );
    }
    return response(res, 404, false, null, 'wrong otp please check your email');
  },
  login: async (req, res) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (!users) {
      return response(res, 404, false, null, ' email not found');
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 404, false, null, 'wrong password');
    }

    if (users.verif == 0) {
      return response(res, 404, false, null, 'account not verified');
    }

    delete users.password;
    delete users.verif;
    delete users.otp;
    let payload = {
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      role: users.role,
    };
    let accessToken = generateToken(payload);
    let refToken = generateRefreshToken(payload);

    users.token = accessToken;
    users.refreshToken = refToken;
    response(res, 200, true, users, 'login success');
  },
  updateEmployee: async (req, res, next) => {
    try {
      const { job, province, city, workplace, description } = req.body;
      const { id } = req.payload;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: 'arutala',
      });
      const {
        rows: [employee],
      } = await findEmployee(id);

      if (!employee) {
        response(res, 404, false, null, 'Employee not found');
      } else {
        const dataProfile = {
          id,
          job,
          province,
          city,
          workplace,
          description,
          photo: image.url,
        };

        await updateEmployee(dataProfile);
        response(res, 200, true, dataProfile, 'update data success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'update data failed');
    }
  },
  updateCompany: async (req, res, next) => {
    try {
      const {
        company_name,
        position,
        province,
        city,
        description,
        company_email,
        company_phone,
        linkedin,
      } = req.body;
      const { id } = req.payload;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: 'arutala',
      });

      const {
        rows: [company],
      } = await findCompany(id);

      if (!company) {
        response(res, 404, false, null, 'Company not found');
      } else {
        const dataProfile = {
          id,
          company_name,
          position,
          province,
          city,
          description,
          company_email,
          company_phone,
          linkedin,
          photo: image.url,
        };

        await updateCompany(dataProfile);
        response(res, 200, true, dataProfile, 'update data success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'update data failed');
    }
  },
  profile: async (req, res, next) => {
    try {
      const { id } = req.payload;

      let {
        rows: [users],
      } = await findUsers(id);

      if (users.role === 'employee') {
        const result = await profileEmploye(id);
        response(res, 200, true, result.rows, 'GET EMPLOYEE PROFILE SUCCESS');
        console.log('Employe');
      } else if (users.role === 'company') {
        const result = await profileCompany(id);
        response(res, 200, true, result.rows, 'GET COMPANY PROFILE SUCCESS');
      } else {
        response(
          res,
          404,
          false,
          null,
          'ROLE TIDAK DITEMUKAN,SILAHKAN HUBUNGI ADMIN'
        );
      }
    } catch (error) {
      response(res, 404, error, 'DATA TIDAK DITEMUKAN');
    }
  },
  AllEmployee: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'name';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allEmployee({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      response(res, 200, true, result.rows, 'GET EMPLOYEE DATA SUCCESS');
    } catch (error) {
      response(res, 404, error, 'DATA TIDAK DITEMUKAN');
    }
  },
};

exports.UserController = UserController;
