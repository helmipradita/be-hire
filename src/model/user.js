const Pool = require(`../config/db`);

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_user where email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const insertEmployee = (profile) => {
  const { id } = profile;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_employee(user_id) 
            VALUES('${id}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const insertCompany = (profile) => {
  const { id, company_name, position } = profile;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_company(user_id, company_name, position) 
              VALUES('${id}','${company_name}','${position}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const registerUser = (data) => {
  const { id, name, email, password, phone, role, otp } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_user(id, name, email, password,phone, role, verif, otp) 
          VALUES('${id}','${name}','${email}','${password}','${phone}','${role}',0,'${otp}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const verif = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_user SET verif=1 WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findUser = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_user where id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findCompany = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_company where user_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmployee = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_employee where user_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const profileEmploye = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
          tbl_user.id, tbl_user.name, tbl_user.email, tbl_user.phone, 
          profile.job as job, profile.province as province,
          profile.city as city, profile.workplace as workplace, 
          profile.description as description, profile.photo as photo 
      FROM tbl_user as tbl_user
      INNER JOIN tbl_employee as profile ON tbl_user.id = profile.user_id
      WHERE tbl_user.id = '${id}';`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const profileCompany = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
          tbl_user.id, tbl_user.name, tbl_user.email, tbl_user.phone,
          profile.company_name as company_name, profile.position as position,
          profile.province as province, profile.city as city, 
          profile.description as description, profile.company_email as company_email,
          profile.company_phone as company_phone, profile.linkedin as linkedin, 
          profile.photo as photo 
          FROM tbl_user as tbl_user
      INNER JOIN tbl_company as profile ON tbl_user.id = profile.user_id
      WHERE tbl_user.id = '${id}';`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateEmployee = (data) => {
  const { id, job, province, city, workplace, description, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_employee SET 
          job='${job}', province='${province}',
          city='${city}' , workplace='${workplace}',
          description='${description}', photo='${photo}' 
      WHERE user_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateCompany = (data) => {
  const {
    id,
    company_name,
    position,
    province,
    city,
    description,
    company_email,
    company_phone,
    linkedin,
    photo,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_company SET 
          company_name='${company_name}', position='${position}',
          province='${province}' , city='${city}',
          description='${description}', company_email='${company_email}',
          company_phone='${company_phone}', linkedin='${linkedin}', 
          photo='${photo}' 
      WHERE user_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const allEmployee = ({ limit, offset, sortBy, sortOrder, search }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        tbl_user.id, tbl_user.name as name, tbl_user.email, 
        profile.job as job, profile.province as province, profile.city as city, 
        profile.workplace as workplace, profile.description as description,
        profile.photo as photo 
      FROM tbl_user as tbl_user
      INNER JOIN tbl_employee as profile ON tbl_user.id = profile.user_id
      WHERE  tbl_user.name
      ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const countAllEmployee = () => {
  return Pool.query('SELECT COUNT(*) AS total FROM tbl_employee');
};

const getEmployeeById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        tbl_user.id, tbl_user.name as name, tbl_user.email, 
        profile.job as job, profile.province as province, profile.city as city, 
        profile.workplace as workplace, profile.description as description,
        profile.photo as photo 
      FROM tbl_user as tbl_user
      INNER JOIN tbl_employee as profile ON tbl_user.id = profile.user_id
      WHERE tbl_user.id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getSkillById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        tbl_skill.id, tbl_skill.name 
      FROM tbl_skill as tbl_skill
      WHERE user_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getPortoById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        tbl_portofolio.id, tbl_portofolio.repo_link, 
        tbl_portofolio.repo_type, tbl_portofolio.photo,
        tbl_portofolio.description 
      FROM tbl_portofolio as tbl_portofolio
      WHERE user_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getExpById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        tbl_experience.id, tbl_experience.position, 
        tbl_experience.company_name, tbl_experience.work_start,
        tbl_experience.work_ended, tbl_experience.description
      FROM tbl_experience as tbl_experience
      WHERE user_id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  findEmail,
  insertEmployee,
  insertCompany,
  registerUser,
  verif,
  findUser,
  findCompany,
  findEmployee,
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
};
