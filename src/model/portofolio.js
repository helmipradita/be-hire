const Pool = require(`../config/db`);

const insertPorto = (data) => {
  const { id, user_id, repo_link, repo_type, photo, description } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_portofolio
        (id, user_id, repo_link, repo_type, photo, description, created_at) 
      VALUES
        ('${id}','${user_id}','${repo_link}','${repo_type}',
        '${photo}','${description}', NOW())`,
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
    `SELECT COUNT(*) AS total FROM tbl_portofolio WHERE user_id='${user_id}'`
  );
};

const findPortoByUser = ({
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
      FROM tbl_portofolio
      WHERE user_id='${user_id}' AND description
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

const findPortoById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * 
      FROM tbl_portofolio
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

const updatePorto = (data) => {
  const { id, user_id, repo_link, repo_type, photo, description } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_portofolio 
      SET
        user_id='${user_id}', repo_link='${repo_link}', 
        repo_type='${repo_type}', photo='${photo}'  ,description='${description}' 
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

const findPorto = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_portofolio WHERE id='${id}'`,
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

const deletePorto = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM tbl_portofolio WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  insertPorto,
  countAll,
  findPortoByUser,
  findPortoById,
  updatePorto,
  findPorto,
  deletePorto,
};
