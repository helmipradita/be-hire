const { response } = require(`../middleware/common`);
const {
  findEmail,
  insertEmployee,
  insertCompany,
  registerUser,
  verif,
  findUser,
  profileEmploye,
  profileCompany,
  updateEmployee,
  updateCompany,
  allEmployee,
  countAllEmployee,
  getEmployeeById,
  getSkillById,
  getPortoById,
  getExpById,
} = require(`../model/user`);
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateToken, generateRefreshToken } = require(`../helpers/auth`);
const email = require('../middleware/email');
const cloudinary = require('../config/photo');

const Port = process.env.PORT;
const Host = process.env.HOST;

const UserController = {
  register: async (req, res, next) => {
    let {
      rows: [user],
    } = await findEmail(req.body.email);

    if (user) {
      return response(res, 404, false, 'email already use, register fail');
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
      if (role === 'employee') {
        await insertEmployee(profile);
      } else if (role === 'company') {
        await insertCompany(profile);
      } else {
        return response(
          res,
          404,
          false,
          null,
          'wrong role input, check it again'
        );
      }
      const result = await registerUser(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/user/${req.body.email}/${otp}`;
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
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, ' register fail');
    }
  },
  verif: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return response(res, 404, false, null, 'email not found');
    }

    if (user.otp == otp) {
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
      rows: [user],
    } = await findEmail(req.body.email);

    if (!user) {
      return response(res, 404, false, null, ' email not found');
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, user.password);
    if (!validation) {
      return response(res, 404, false, null, 'wrong password');
    }

    if (user.verif == 0) {
      return response(res, 404, false, null, 'account not verified');
    }

    delete user.password;
    delete user.verif;
    delete user.otp;
    let payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    let accessToken = generateToken(payload);
    let refToken = generateRefreshToken(payload);

    user.token = accessToken;
    user.refreshToken = refToken;
    response(res, 200, true, user, 'login success');
  },
  profile: async (req, res, next) => {
    try {
      const { id } = req.payload;

      let {
        rows: [user],
      } = await findUser(id);

      if (user.role === 'employee') {
        const result = await profileEmploye(id);
        response(res, 200, true, result.rows, 'get employee profile success');
      } else if (user.role === 'company') {
        const result = await profileCompany(id);
        response(res, 200, true, result.rows, 'get company profile success');
      } else {
        response(res, 404, false, null, 'user not found');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, error, 'get profile failed');
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.payload;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: 'arutala',
      });

      const {
        rows: [user],
      } = await findUser(id);

      if (!user) {
        response(res, 404, false, null, 'user not found');
      } else if (req.payload.role === 'employee') {
        const { job, province, city, workplace, description } = req.body;

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
        response(
          res,
          200,
          true,
          dataProfile,
          'update profile employee success'
        );
      } else if (req.payload.role === 'company') {
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
        response(res, 200, true, dataProfile, 'update company profile success');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'update company profile failed');
    }
  },
  employeeAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
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

      const {
        rows: [count],
      } = await countAllEmployee();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(
        res,
        200,
        true,
        { result: result.rows, pagination: pagination },
        'get employee success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, error, 'get employee failed');
    }
  },
  employeeById: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        rows: [employee],
      } = await getEmployeeById(id);

      const resultSkill = await getSkillById(id);
      const skill = resultSkill.rows;

      const resultPorto = await getPortoById(id);
      const portofolio = resultPorto.rows;

      const resultExp = await getExpById(id);
      const experience = resultExp.rows;

      const employeeAll = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        job: employee.job,
        province: employee.province,
        city: employee.city,
        workplace: employee.workplace,
        description: employee.description,
        photo: employee.photo,
      };

      const data = { ...employeeAll, skill, portofolio, experience };

      response(res, 200, true, data, 'get employee by id success');
    } catch (error) {
      console.log(error);
      response(res, 404, error, 'get employee by id failed');
    }
  },
};

exports.UserController = UserController;
