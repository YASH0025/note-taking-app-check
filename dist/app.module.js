"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const constants_1 = require("./constants");
const commonfunctions_1 = require("./common/common_functions/commonfunctions");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            auth_module_1.AuthModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'src\/schema.graphql',
                include: [auth_module_1.AuthModule, users_module_1.UsersModule],
                playground: true,
                formatError: (err) => (0, constants_1.errorFormatter)(err)
            }),
            users_module_1.UsersModule,
            passport_1.PassportModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.HOST,
                    port: parseInt(process.env.HOST_PORT, 10),
                    ignoreTLS: true,
                    secure: true,
                    auth: {
                        user: process.env.HOST_USER,
                        pass: process.env.HOST_PASSWORD
                    },
                },
                defaults: {
                    from: `"nest-modules" <${process.env.HOST_USER}>`,
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new ejs_adapter_1.EjsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            })
        ],
        providers: [commonfunctions_1.CommonFunctions]
    })
], AppModule);
