const { response } = require(`../middleware/common`);
const {
  insertHire,
  getHireEmployee,
  getHireCompany,
  findHireByUserId,
  findHireEmployee,
} = require(`../model/hire`);
const { v4: uuidv4 } = require('uuid');

const HireController = {
  addByEmployeeId: async (req, res, next) => {
    try {
      const company_id = req.payload.id;
      const employee_id = req.params.employee_id;
      const { position, description } = req.body;

      if (req.payload.role === 'employee') {
        return response(
          res,
          404,
          false,
          null,
          `role employee do not have access here`
        );
      }

      let data = {
        id: uuidv4(),
        position,
        company_id,
        employee_id,
        description,
      };

      await insertHire(data);
      response(res, 200, true, data, 'insert hire success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'insert hire failed');
    }
  },
  getAllHire: async (req, res, next) => {
    try {
      const { id, role } = req.payload;

      if (role === 'employee') {
        return response(
          res,
          404,
          false,
          null,
          `role employee do not have access here`
        );
      }

      const {
        rows: [checHire],
      } = await findHireByUserId(id);

      if (!checHire) {
        return response(
          res,
          404,
          false,
          null,
          `user don't have hire, check again`
        );
      }

      const result = await findHireEmployee(id);

      response(res, 200, true, result.rows, 'get hire success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get hire fail');
    }
  },
  getByUserId: async (req, res, next) => {
    try {
      const user_id = req.payload.id;
      let result;

      if (req.payload.role === 'employee') {
        console.log('login akun employee');

        result = await getHireCompany({
          user_id,
        });

        console.log(result.rows);
      } else if (req.payload.role === 'company') {
        console.log('login akun company');

        result = await getHireEmployee({
          user_id,
        });
      }

      if (!result.rows) {
        return response(
          res,
          404,
          false,
          null,
          `user don't have hire, check again`
        );
      }

      response(res, 200, true, result.rows, 'get hire success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get hire fail');
    }
  },
};

exports.HireController = HireController;
