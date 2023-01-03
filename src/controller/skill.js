const { response } = require(`../middleware/common`);
const {
  insertSkill,
  getSkill,
  countAll,
  findSkillByUserId,
  updateSkill,
  findSkill,
  deleteSkill,
} = require(`../model/skill`);
const { v4: uuidv4 } = require('uuid');

const SkillController = {
  addByUserId: async (req, res, next) => {
    try {
      const user_id = req.payload.id;
      const { name } = req.body;

      if (req.payload.role === 'company') {
        return response(
          res,
          404,
          false,
          null,
          `role company do not have access here`
        );
      }

      let dataSkill = {
        id: uuidv4(),
        user_id,
        name,
      };

      await insertSkill(dataSkill);
      response(res, 200, true, dataSkill, 'insert skill success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'insert skill failed');
    }
  },
  getAll: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const sortBy = req.query.sortBy || 'name';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await getSkill({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAll();
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
        'get skill success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get skill fail');
    }
  },
  getByUser: async (req, res, next) => {
    try {
      const user_id = req.payload.id;

      const result = await findSkillByUserId(user_id);

      if (!result.rows) {
        return response(
          res,
          404,
          false,
          null,
          `user don't have skill, check again`
        );
      }

      // const result = await findSkillByUserId(user_id);

      response(res, 200, true, result.rows, 'get skill success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get skill fail');
    }
  },
  getByUserId: async (req, res, next) => {
    try {
      const user_id = req.params.id;

      const {
        rows: [skill],
      } = await findSkillByUserId(user_id);

      if (!skill) {
        return response(
          res,
          404,
          false,
          null,
          `user don't have skill, check again`
        );
      }

      const result = await findSkillByUserId(user_id);

      response(res, 200, true, result.rows, 'get skill success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get skill fail');
    }
  },
  editByUserId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.payload.id;
      const { name } = req.body;

      const {
        rows: [skill],
      } = await findSkill(id);

      if (!skill) {
        return response(res, 404, false, null, 'skill not found, check again');
      }

      const data = {
        id,
        user_id,
        name,
      };

      if (user_id === skill.user_id) {
        await updateSkill(data);
        return response(res, 200, true, data, 'update skill success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'update skill failed, your user is not the owner of this skill id'
        );
      }
    } catch (error) {
      console.log(error);
      return response(res, 404, false, err, 'update skill failed');
    }
  },
  deleteByUserId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.payload.id;

      const {
        rows: [skill],
      } = await findSkill(id);

      if (!skill) {
        return response(res, 404, false, null, 'skill not found, check again');
      }

      if (user_id === skill.user_id) {
        await deleteSkill(id);
        response(res, 200, true, skill, 'delete skill success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'delete skill failed, your user is not the owner of this skill id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'delete skill fail');
    }
  },
};

exports.SkillController = SkillController;
