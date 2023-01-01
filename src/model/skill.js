const Pool = require(`../config/db`);

const insertSkill = (data) => {
  const { id, user_id, name } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_skill(id, user_id, name) 
          VALUES('${id}','${user_id}','${name}')`,
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

const getSkill = () => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT DISTINCT name FROM tbl_skill`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findSkillByUserId = (user_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id, user_id, name FROM tbl_skill WHERE user_id='${user_id}'`,
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

const updateSkill = (data) => {
  const { id, user_id, name } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_skill SET user_id='${user_id}', name='${name}' WHERE id='${id}'`,
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

const findSkill = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_skill WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const deleteSkill = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_skill WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertSkill,
  getSkill,
  findSkillByUserId,
  updateSkill,
  findSkill,
  deleteSkill,
};
