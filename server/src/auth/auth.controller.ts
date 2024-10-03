import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Tokens } from './types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetCurrentUserID } from 'src/common/decoratos/get-current-use-id';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}
    
    @Post('sign-in')
    @UsePipes(new ValidationPipe())
    signIn(@Body() signInDto:SignInDto):Promise<Tokens> {
        return this.authService.signIn(signInDto);
    }
    @Post('sign-up')
    @UsePipes(new ValidationPipe())
    signUp(@Body() signUpDto:SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Request() req) {
        const userId = req.user?.userId;  // Extract user ID from the request (JWT payload)
        return this.authService.logout(userId);  
    }

    @Get('refresh-token')
    @UseGuards(JwtAuthGuard)
    refreshToken(@Request() req:any) {
        const userId = req.user?.userId;  // Extract user ID from the request (JWT payload)
        return this.authService.refreshToken(userId);  
    }
    
}
