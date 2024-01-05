// auth.controller.ts

import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';


@Controller('account/verify')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Get(':token')
    async verifyUser(@Param('token') token: string, @Res() res): Promise<any> {
        const message = await this.authService.verifyUser(token) 
        res.header('Content-Type', 'text/html')
        return res.send(message);
    }


//     @Get()
//   @UseGuards(AuthGuard('google'))
//   async googleAuth(@Req() req) { }

//   @Get('auth/google/callback')
//   @UseGuards(AuthGuard('google'))
//   googleAuthRedirect(@Req() req) {
//     return this.authService.googleLogin(req)
//   }
}
