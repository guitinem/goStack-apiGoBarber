"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
var ListProviderMonthAvailabilityService_1 = __importDefault(require("./ListProviderMonthAvailabilityService"));
var listProviderMonthAvailabilityService;
var fakeAppointmentsRepository;
describe('ListProviderMonthAvailability', function () {
    beforeEach(function () {
        fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService_1.default(fakeAppointmentsRepository);
    });
    it('should be able to list the month availability from provider', function () { return __awaiter(void 0, void 0, void 0, function () {
        var listAvailabilty;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeAppointmentsRepository.create({
                        provider_id: 'user',
                        user_id: 'user',
                        date: new Date(2020, 3, 20, 8, 0, 0),
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 8, 0, 0),
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 9, 0, 0),
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 10, 0, 0),
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 11, 0, 0),
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 12, 0, 0),
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 13, 0, 0),
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 14, 0, 0),
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 15, 0, 0),
                        })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 16, 0, 0),
                        })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 20, 17, 0, 0),
                        })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, fakeAppointmentsRepository.create({
                            provider_id: 'user',
                            user_id: 'user',
                            date: new Date(2020, 4, 21, 8, 0, 0),
                        })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, listProviderMonthAvailabilityService.execute({
                            provider_id: 'user',
                            month: 5,
                            year: 2020,
                        })];
                case 13:
                    listAvailabilty = _a.sent();
                    expect(listAvailabilty).toEqual(expect.arrayContaining([
                        { day: 19, available: true },
                        { day: 20, available: false },
                        { day: 21, available: true },
                        { day: 22, available: true },
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
});