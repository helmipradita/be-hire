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
      `SELECT tbl_hire.id, 
        tbl_user.name,
        tbl_hire.position, tbl_hire.description
      FROM tbl_hire AS tbl_hire
      INNER JOIN tbl_user AS tbl_user ON tbl_hire.employee_id = tbl_user.id
      WHERE tbl_hire.company_id='${user_id}'`,
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
      `SELECT tbl_hire.id, 
        tbl_company.company_name,
        tbl_hire.position, tbl_hire.description
      FROM tbl_hire AS tbl_hire
      INNER JOIN tbl_company AS tbl_company ON tbl_hire.company_id = tbl_company.user_id
      WHERE tbl_hire.employee_id='${user_id}'`,
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

const findHireByUserId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * 
      FROM tbl_hire
      WHERE company_id='${id}' `,
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

const findHireEmployee = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_hire.id AS id, tbl_hire.employee_id AS employee_id, 
        tbl_user.name AS name, tbl_hire.position as position, tbl_employee.photo as photo
      FROM tbl_user AS tbl_user 
      INNER JOIN tbl_hire AS tbl_hire ON tbl_user.id = tbl_hire.company_id
      INNER JOIN tbl_employee AS tbl_employee ON tbl_hire.employee_id = tbl_employee.user_id
      WHERE tbl_hire.company_id = '${id}'`,
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
  findHireByUserId,
  findHireEmployee,
};
