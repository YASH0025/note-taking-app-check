"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUserInput = exports.CreateAuthInput = exports.SignInAuthInput = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const graphql_1 = require("@nestjs/graphql");
const class_validator_2 = require("class-validator");
const constants_1 = require("../../constants");
const user_entity_1 = require("../../common/entities/user.entity");
let SignInAuthInput = class SignInAuthInput extends user_entity_1.Email {
};
exports.SignInAuthInput = SignInAuthInput;
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 30),
    (0, class_validator_1.Matches)(/^\S*$/, { message: constants_1.CONSTANTS.PASSWORD_WHITE_SPACE_MESSAGE }),
    (0, class_validator_2.IsStrongPassword)({}, { message: constants_1.CONSTANTS.STRONG_PASSWORD }),
    __metadata("design:type", String)
], SignInAuthInput.prototype, "password", void 0);
exports.SignInAuthInput = SignInAuthInput = __decorate([
    (0, graphql_1.InputType)()
], SignInAuthInput);
let CreateAuthInput = class CreateAuthInput extends SignInAuthInput {
};
exports.CreateAuthInput = CreateAuthInput;
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 50, { message: constants_1.CONSTANTS.ENTER_FULLNAME }),
    (0, class_validator_1.Matches)(/^([A-Z][a-z]+(?: [A-Za-z]+)*)$/, { message: constants_1.CONSTANTS.FULLNAME_INVALID_MESSAGE }),
    __metadata("design:type", String)
], CreateAuthInput.prototype, "fullName", void 0);
exports.CreateAuthInput = CreateAuthInput = __decorate([
    (0, graphql_1.InputType)()
], CreateAuthInput);
let RemoveUserInput = class RemoveUserInput {
};
exports.RemoveUserInput = RemoveUserInput;
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 30),
    __metadata("design:type", String)
], RemoveUserInput.prototype, "userName", void 0);
exports.RemoveUserInput = RemoveUserInput = __decorate([
    (0, graphql_1.InputType)()
], RemoveUserInput);
