"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const database_module_1 = require("../common/database/database.module");
const users_providers_1 = require("../users/users.providers");
const constants_1 = require("./constants");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const local_strategy_1 = require("./strategy/local.strategy");
const users_service_1 = require("../users/users.service");
const auth_controller_1 = require("./auth.controller");
const commonfunctions_1 = require("../common/common_functions/commonfunctions");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    signOptions: { expiresIn: '9h' },
                    secret: constants_1.jwtSecret
                })
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [users_service_1.UsersService, auth_resolver_1.AuthResolver, auth_service_1.AuthService, ...users_providers_1.UsersProviders, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy, commonfunctions_1.CommonFunctions]
    })
], AuthModule);
