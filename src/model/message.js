const Pool = require(`../config/db`);

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

const insertMessage = (data) => {
  const { hire_id, sender_id, reciver_id, message } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_message
        (hire_id, sender_id, reciver_id, message, created_at) 
      VALUES
        ('${hire_id}', '${sender_id}', '${reciver_id}', '${message}', NOW())`,
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

const findMessageById = (hire_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_message.hire_id, tbl_message.sender_id, tbl_message.reciver_id,
        tbl_message.message, tbl_message.created_at
      FROM tbl_message AS tbl_message
      WHERE tbl_message.hire_id='${hire_id}'`,
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

const getChat = (hire_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_message.id, tbl_message.hire_id, tbl_message.reciver_id,
        tbl_message.sender_id, tbl_message.message, tbl_message.created_at 
      FROM tbl_message as tbl_message
      WHERE tbl_message.hire_id='${hire_id}'`,
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
const findHireCompany = (hire_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_hire.id as tbl_hire_id, tbl_hire.position, 
        profile.company_name as company_name, profile.photo as photo 
      FROM tbl_hire as tbl_hire 
      INNER JOIN tbl_company as profile ON tbl_hire.company_id = profile.user_id
      WHERE tbl_hire.id = '${hire_id}';`,
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

const findHireEmployee = (hire_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT tbl_hire.id,tbl_hire.position, tbl_hire.employee_id, 
        tbl_employee.photo as photo,
        tbl_user.name
      FROM tbl_hire as tbl_hire 
      INNER JOIN tbl_employee as tbl_employee ON tbl_hire.employee_id = tbl_employee.user_id
      INNER JOIN tbl_user as tbl_user ON tbl_employee.user_id = tbl_user.id
      WHERE tbl_hire.id = '${hire_id}'`,
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
  findHireById,
  insertMessage,
  findMessageById,
  getChat,
  findHireCompany,
  findHireEmployee,
};
