"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
var appointmentRouter = express_1.Router();
var appointmentsController = new AppointmentsController_1.default();
appointmentRouter.use(ensureAuthenticated_1.default);
// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find({
//     where: { provider_id: request.user.id },
//   });
//   return response.json(appointments);
// });
appointmentRouter.post('/', appointmentsController.create);
exports.default = appointmentRouter;
