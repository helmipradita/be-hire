const Pool = require(`../config/db`);

const insertExp = (data) => {
  const {
    id,
    user_id,
    position,
    company_name,
    work_start,
    work_ended,
    description,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_experience
        (id, user_id, position, company_name, work_start, 
          work_ended, description, created_at) 
      VALUES
        ('${id}','${user_id}','${position}','${company_name}','${work_start}',
          '${work_ended}','${description}', NOW())`,
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

const countAll = (user_id) => {
  return Pool.query(
    `SELECT COUNT(*) AS total FROM tbl_experience WHERE user_id='${user_id}'`
  );
};

const findExpByUser = ({
  user_id,
  limit,
  offset,
  sortBy,
  sortOrder,
  search,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * 
      FROM tbl_experience
      WHERE user_id='${user_id}' AND position
      ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} 
        LIMIT ${limit} OFFSET ${offset}`,
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

const findExpById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * 
      FROM tbl_experience
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

const updateExp = (data) => {
  const {
    id,
    user_id,
    position,
    company_name,
    work_start,
    work_ended,
    description,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_experience 
      SET
        user_id='${user_id}', position='${position}', 
        company_name='${company_name}', work_start='${work_start}', 
        work_ended='${work_ended}', description='${description}' 
      WHERE id='${id}'`,
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

const findExp = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_experience WHERE id='${id}'`,
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

const deleteExp = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_experience WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertExp,
  countAll,
  findExpByUser,
  findExpById,
  updateExp,
  findExp,
  deleteExp,
};
