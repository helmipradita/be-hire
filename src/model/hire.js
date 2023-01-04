const Pool = require(`../config/db`);

const insertHire = (data) => {
  const { id, position, company_id, employee_id, description } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_hire
        (id, position, company_id, employee_id, description, created_at) 
      VALUES
        ('${id}','${position}','${company_id}','${employee_id}',
        '${description}', NOW())`,
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

const getHireEmployee = ({ user_id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT employee_id AS user_id, *
      FROM tbl_hire
      WHERE employee_id='${user_id}'`,
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

const getHireCompany = ({ user_id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT company_id AS user_id, *
      FROM tbl_hire
      WHERE company_id='${user_id}'`,
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

const findHireById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * 
      FROM tbl_hire
      WHERE id='${id}' `,
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
  insertHire,
  getHireEmployee,
  getHireCompany,
  findHireById,
};
