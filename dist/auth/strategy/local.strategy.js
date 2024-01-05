"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authservice) {
        super();
        this.authservice = authservice;
    }
    async validate(email, password) {
        const user = await this.authservice.signInUser({ email: email, password: password });
        if (user.statusCode !== common_1.HttpStatus.OK) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
}
exports.LocalStrategy = LocalStrategy;
