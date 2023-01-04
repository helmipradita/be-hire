const { response } = require(`../middleware/common`);
const {
  findHireById,
  insertMessage,
  findMessageById,
  getChat,
  findHireCompany,
  findHireEmployee,
} = require(`../model/message`);
const { v4: uuidv4 } = require('uuid');

const MessageController = {
  addByHireId: async (req, res, next) => {
    try {
      const { id, role } = req.payload;
      const hire_id = req.params.hire_id;
      const { message } = req.body;

      const {
        rows: [hire],
      } = await findHireById(hire_id);

      if (!hire) {
        return response(res, 404, false, null, 'hire not found, check again');
      }

      if (hire.employee_id !== id) {
        console.log('heiii dilarang kesini');
        return response(
          res,
          404,
          false,
          'insert message failed, user_id not found in this hire_id'
        );
      }

      const data = {
        hire_id,
        message,
      };

      if (role === 'employee') {
        data.sender_id = id;
        data.reciver_id = hire.company_id;
      } else if (role === 'company') {
        data.sender_id = id;
        data.reciver_id = hire.employee_id;
      }

      await insertMessage(data);
      response(res, 200, true, data, 'insert message success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'insert message failed');
    }
  },
  getListMessageById: async (req, res, next) => {
    const role = req.payload.role;
    const hire_id = req.params.hire_id;
    try {
      if (role === 'employee') {
        let {
          rows: [company],
        } = await findHireCompany(hire_id);

        const dataCompany = {
          company_name: company.company_name,
          position: company.position,
          photo: company.photo,
        };

        const dataChat = await getChat(hire_id);
        const chat = dataChat.rows;

        const result = {
          ...dataCompany,
          chat,
        };

        response(res, 200, true, result, 'get message success');
      } else if (role === 'company') {
        let {
          rows: [employee],
        } = await findHireEmployee(hire_id);

        const dataEmployee = {
          name: employee.name,
          position: employee.position,
          photo: employee.photo,
        };

        const dataChat = await getChat(hire_id);
        const chat = dataChat.rows;

        const result = {
          ...dataEmployee,
          chat,
        };

        response(res, 200, true, result, 'get message success');
      } else {
        response(res, 200, false, [], 'role not found');
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get message failed');
    }
  },
};

exports.MessageController = MessageController;
