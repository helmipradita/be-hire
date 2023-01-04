const { response } = require(`../middleware/common`);
const {
  insertPorto,
  countAll,
  findPortoByUser,
  findPortoById,
  updatePorto,
  findPorto,
  deletePorto,
} = require(`../model/portofolio`);
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../config/photo');

const PortoController = {
  addByUserId: async (req, res, next) => {
    try {
      const user_id = req.payload.id;
      const { repo_link, repo_type, description } = req.body;

      if (req.payload.role === 'company') {
        return response(
          res,
          404,
          false,
          null,
          `role company do not have access here`
        );
      }
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: 'arutala',
      });

      let data = {
        id: uuidv4(),
        user_id,
        repo_link,
        repo_type,
        photo: image.url,
        description,
      };

      await insertPorto(data);
      response(res, 200, true, data, 'insert portofolio success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'insert portofolio failed');
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

      const result = await findPortoByUser({
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
          `user don't have portofolio, check again`
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
        'get portofolio success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get portofolio fail');
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        rows: [portofolio],
      } = await findPortoById(id);

      if (!portofolio) {
        return response(
          res,
          404,
          false,
          null,
          `user don't have portofolio, check again`
        );
      }

      const result = await findPortoById(id);

      response(res, 200, true, result.rows, 'get portofolio success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get portofolio fail');
    }
  },
  editByUserId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.payload.id;
      const { repo_link, repo_type, description } = req.body;

      const {
        rows: [portofolio],
      } = await findPorto(id);

      if (!portofolio) {
        return response(
          res,
          404,
          false,
          null,
          'portofolio not found, check again'
        );
      }

      const data = {
        id,
        user_id,
        repo_link,
        repo_type,
        description,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: 'arutala',
        });

        data.photo = image.url;
      } else {
        data.photo = portofolio.photo;
      }

      if (user_id === portofolio.user_id) {
        await updatePorto(data);
        return response(res, 200, true, data, 'update portofolio success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'update portofolio failed, your user is not the owner of this portofolio id'
        );
      }
    } catch (error) {
      console.log(error);
      return response(res, 404, false, error, 'update portofolio failed');
    }
  },
  deleteByUserId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.payload.id;

      const {
        rows: [portofolio],
      } = await findPorto(id);

      if (!portofolio) {
        return response(
          res,
          404,
          false,
          null,
          'portofolio not found, check again'
        );
      }

      if (user_id === portofolio.user_id) {
        await deletePorto(id);
        response(res, 200, true, portofolio, 'delete portofolio success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'delete portofolio failed, your user is not the owner of this portofolio id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete portofolio fail');
    }
  },
};

exports.PortoController = PortoController;
