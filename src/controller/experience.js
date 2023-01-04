const { response } = require(`../middleware/common`);
const {
  insertExp,
  countAll,
  findExpByUser,
  findExpById,
  updateExp,
  findExp,
  deleteExp,
} = require(`../model/experience`);
const { v4: uuidv4 } = require('uuid');

const ExpController = {
  addByUserId: async (req, res, next) => {
    try {
      const user_id = req.payload.id;
      const { position, company_name, work_start, work_ended, description } =
        req.body;

      if (req.payload.role === 'company') {
        return response(
          res,
          404,
          false,
          null,
          `role company do not have access here`
        );
      }

      let data = {
        id: uuidv4(),
        user_id,
        position,
        company_name,
        work_start,
        work_ended,
        description,
      };

      await insertExp(data);
      response(res, 200, true, data, 'insert experience success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'insert experience failed');
    }
  },
  getByUser: async (req, res, next) => {
    try {
      const user_id = req.payload.id;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const sortBy = req.query.sortBy || 'created_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await findExpByUser({
        user_id,
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      if (!result.rows) {
        return response(
          res,
          404,
          false,
          null,
          `user don't have experience, check again`
        );
      }

      const {
        rows: [count],
      } = await countAll(user_id);
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
        'get experience success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get experience fail');
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [experience],
      } = await findExpById(id);

      if (!experience) {
        return response(
          res,
          404,
          false,
          null,
          `user don't have experience, check again`
        );
      }

      const result = await findExpById(id);

      response(res, 200, true, result.rows, 'get experience success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get experience fail');
    }
  },
  editByUserId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.payload.id;
      const { position, company_name, work_start, work_ended, description } =
        req.body;

      const {
        rows: [experience],
      } = await findExp(id);

      if (!experience) {
        return response(
          res,
          404,
          false,
          null,
          'experience not found, check again'
        );
      }

      const data = {
        id,
        user_id,
        position,
        company_name,
        work_start,
        work_ended,
        description,
      };

      if (user_id === experience.user_id) {
        await updateExp(data);
        return response(res, 200, true, data, 'update experience success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'update experience failed, your user is not the owner of this experience id'
        );
      }
    } catch (error) {
      console.log(error);
      return response(res, 404, false, error, 'update experience failed');
    }
  },
  deleteByUserId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.payload.id;

      const {
        rows: [experience],
      } = await findExp(id);

      if (!experience) {
        return response(
          res,
          404,
          false,
          null,
          'experience not found, check again'
        );
      }

      if (user_id === experience.user_id) {
        await deleteExp(id);
        response(res, 200, true, experience, 'delete experience success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'delete experience failed, your user is not the owner of this experience id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete experience fail');
    }
  },
};

exports.ExpController = ExpController;
