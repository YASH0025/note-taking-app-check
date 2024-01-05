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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_auth_input_1 = require("./dto/create-auth.input");
const user_entity_1 = require("../common/entities/user.entity");
const update_auth_input_1 = require("./dto/update-auth.input");
const constants_1 = require("../constants");
const jwt_1 = require("@nestjs/jwt");
const gql_auth_guard_1 = require("./guards/gql-auth.guard");
let AuthResolver = class AuthResolver {
    constructor(jwtService, authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }
    async signUpUser(signUpUser) {
        try {
            const response = await this.authService.signUpUser(signUpUser);
            return response;
        }
        catch (error) {
            return {
                message: constants_1.CONSTANTS.UNKNOWN_ERROR_DURING_SIGNUP,
                statusCode: common_1.HttpStatus.ACCEPTED
            };
        }
    }
    async signInUser(signInUser, context) {
        try {
            const { email } = signInUser;
            if ((!email))
                return {
                    user: null,
                    message: constants_1.CONSTANTS.USERNAME_OR_EMAIL_CHECK,
                    statusCode: common_1.HttpStatus.BAD_REQUEST
                };
            const result = await this.authService.signInUser(signInUser);
            return result;
        }
        catch (error) {
            return {
                user: null,
                message: constants_1.CONSTANTS.UNKNOWN_ERROR_DURING_SIGNIN,
                statusCode: common_1.HttpStatus.ACCEPTED
            };
        }
    }
    async resendAccountVerificationEmail(email) {
        const response = await this.authService.resendAccountVerificationEmail(email);
        return response;
    }
    async greetings() {
        return 'Hello World';
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.Message),
    __param(0, (0, graphql_1.Args)('signUpUser', new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_input_1.CreateAuthInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUpUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.Data),
    __param(0, (0, graphql_1.Args)('signInUser', new common_1.ValidationPipe())),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_auth_input_1.LoginAuth, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signInUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.Message),
    __param(0, (0, graphql_1.Args)('resendVerificationEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.Email]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resendAccountVerificationEmail", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "greetings", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.Data),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_service_1.AuthService])
], AuthResolver);
