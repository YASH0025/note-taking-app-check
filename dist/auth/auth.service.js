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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const commonMongooseQuries_1 = require("../common/common_functions/commonMongooseQuries");
const constants_1 = require("../constants");
const constants_2 = require("./constants");
const commonfunctions_1 = require("../common/common_functions/commonfunctions");
let AuthService = class AuthService {
    constructor(jwtService, userModel, UserDetailsModel, commonFunctions) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.UserDetailsModel = UserDetailsModel;
        this.commonFunctions = commonFunctions;
        this.mongooseFunction = new commonMongooseQuries_1.CommonMongooseFunctions(this.userModel);
    }
    async signUpUser(createAuthInput) {
        let message;
        let user = await this.mongooseFunction.findOne({
            email: createAuthInput.email
        });
        if (!user) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(createAuthInput.password, salt);
            createAuthInput.password = hashPassword;
            createAuthInput;
            user = await this.mongooseFunction.insertOne({ ...createAuthInput, isVerified: false });
            const payload = { _id: user._id, email: user.email, tokenType: 'accountVerification' };
            const verification_token = await this.jwtService.signAsync(payload, { expiresIn: '9h' });
            const path = 'src\/templates\/registrationTemplate.ejs';
            const html = await this.commonFunctions.renderWithData({ user: user, link: `${process.env.LOCAL_DOMAIN_NAME}/account/verify/${verification_token}`, appName: process.env.APP_NAME }, path);
            const data = {
                to: user?.email,
                subject: `${constants_1.CONSTANTS.USER_REGISTRATION_EMAIL_SUBJECT} ${process.env.APP_NAME}`,
                html: html
            };
            await this.commonFunctions.sendEmail(data)
                .then((d) => {
                message = {
                    message: constants_1.CONSTANTS.REGISTRATION_SUCCESSFULL,
                    statusCode: common_1.HttpStatus.OK
                };
            })
                .catch((err) => {
                message = {
                    statusCode: common_1.HttpStatus.NOT_MODIFIED,
                    message: constants_1.CONSTANTS.UNKNOWN_ERROR
                };
            });
            return message;
        }
        else {
            message = {
                message: constants_1.CONSTANTS.USER_ALREADY_EXISTS,
                statusCode: common_1.HttpStatus.NOT_MODIFIED
            };
            return message;
        }
    }
    async resendAccountVerificationEmail(email) {
        const user = await this.mongooseFunction.findOne(email);
        let message;
        if (user) {
            if (user && !user.isVerified) {
                const payload = { _id: user._id, email: user.email, tokenType: 'accountVerification' };
                const verification_token = await this.jwtService.signAsync(payload, { expiresIn: '9h' });
                const path = 'src\/templates\/registrationTemplate.ejs';
                const html = await this.commonFunctions.renderWithData({ user: user, link: `${process.env.LOCAL_DOMAIN_NAME}/account/verify/${verification_token}`, appName: process.env.APP_NAME }, path);
                const data = {
                    to: user?.email,
                    subject: `${constants_1.CONSTANTS.USER_REGISTRATION_EMAIL_SUBJECT} ${process.env.APP_NAME}`,
                    html: html
                };
                await this.commonFunctions.sendEmail(data)
                    .then(() => {
                    message = {
                        message: constants_1.CONSTANTS.USER_VERIFICATION_EMAIL,
                        statusCode: common_1.HttpStatus.OK
                    };
                })
                    .catch(() => {
                    message = {
                        statusCode: common_1.HttpStatus.NOT_MODIFIED,
                        message: constants_1.CONSTANTS.UNKNOWN_ERROR
                    };
                });
                return message;
            }
            else {
                message = {
                    message: 'User already verified',
                    statusCode: 201
                };
                return message;
            }
        }
        else {
            message = {
                message: constants_1.CONSTANTS.EMAIL_NOT_FOUND,
                statusCode: common_1.HttpStatus.FORBIDDEN
            };
            return message;
        }
    }
    async verifyUser(token) {
        const details = await this.jwtService.verifyAsync(token, { secret: constants_2.jwtSecret }).catch((error => {
            return { message: error };
        }));
        let data;
        if (details._id && await this.commonFunctions.tokenExpiryCheck(details.exp)) {
            let userDetails = await this.mongooseFunction.findOne({
                _id: details._id
            });
            if (userDetails && !userDetails.isVerified) {
                userDetails.isVerified = true;
                userDetails.save();
                const path = 'src\/templates\/successRegistration.ejs';
                const html = await this.commonFunctions.renderWithData({ user: userDetails, appName: process.env.APP_NAME }, path);
                const emailData = {
                    to: userDetails?.email,
                    subject: `${constants_1.CONSTANTS.SUCCESSFULL_VERIFICATION} ${process.env.APP_NAME}`,
                    html: html
                };
                await this.commonFunctions.sendEmail(emailData)
                    .then(() => {
                    data = {
                        message: `${constants_1.CONSTANTS.SUCCESSFULL_VERIFICATION} ${process.env.APP_NAME}`,
                        statusCode: common_1.HttpStatus.OK
                    };
                })
                    .catch(() => {
                    data = {
                        statusCode: common_1.HttpStatus.NOT_MODIFIED,
                        message: constants_1.CONSTANTS.UNKNOWN_ERROR
                    };
                });
                return '<h1>User verified successfully</h1>';
            }
            else {
                return '<h1>User already verified</h1>';
            }
        }
        else {
            return '<h1>Invalid url</h1>';
        }
    }
    async signInUser(loginAuthInput) {
        let query = {};
        if (loginAuthInput.email && loginAuthInput.email !== '')
            query.email = loginAuthInput.email;
        let user = await this.UserDetailsModel.findOne(query).lean();
        if (user) {
            const hashPassword = await bcrypt.compare(loginAuthInput.password, user.password);
            if (hashPassword) {
                const payload = { _id: user._id, email: user.email };
                const auth_token = await this.jwtService.signAsync(payload);
                const message = {
                    message: constants_1.CONSTANTS.SIGNEDIN_SUCCESS,
                    statusCode: common_1.HttpStatus.OK
                };
                const data = {
                    user: { ...user, auth_token: auth_token },
                    ...message
                };
                return data;
            }
            else {
                const message = {
                    statusCode: common_1.HttpStatus.ACCEPTED,
                    message: loginAuthInput.email !== '' ? constants_1.CONSTANTS.INVALID_EMAIL_PASSWORD : constants_1.CONSTANTS.INVALID_USERNAMNE_PASSWORD
                };
                const data = {
                    user: null,
                    ...message
                };
                return data;
            }
        }
        else {
            return {
                user: null,
                statusCode: 201,
                message: loginAuthInput.email !== '' ? constants_1.CONSTANTS.EMAIL_NOT_FOUND : constants_1.CONSTANTS.USERNAME_NOT_FOUND
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('USER_MODEL')),
    __param(2, (0, common_1.Inject)('USER_MODEL')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_1.Model,
        mongoose_1.Model,
        commonfunctions_1.CommonFunctions])
], AuthService);
