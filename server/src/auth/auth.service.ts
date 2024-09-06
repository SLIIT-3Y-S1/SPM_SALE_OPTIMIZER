import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { hashPassword,comparePassword } from 'src/utils';
import { TokenService } from './service/tokenService';
import { Tokens } from './types';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly tokenService:TokenService

    ) {}

    async updateRtHash(user_id:string, rt:string) {
        const hash_refresh_token = await hashPassword(rt);
        await this.prismaService.user.update({
            where:{
                user_id
            },
            data:{
                hash_refresh_token
            }
        })
        
    }
    
    async signUp(signUpDto:SignUpDto):Promise<Tokens> {
        const hashPsd = await hashPassword(signUpDto.password);
        const isUserExist = await this.prismaService.user.findUnique({
            where: {
                email: signUpDto.email,
                username: signUpDto.username
            }
        });
        if (isUserExist) {
            throw new Error('User already exists');
        }
        const user = await this.prismaService.user.create({
            data: {
                username: signUpDto.username,
                email: signUpDto.email,
                hash_password: hashPsd
            }
        });
        const tokens = await this.tokenService.generateToken(user);
        await this.updateRtHash(user.user_id, tokens.refreshToken);
        return tokens;
    }

    async signIn(signInDto:SignInDto) :Promise<Tokens>{
        const user = await this.prismaService.user.findUnique({
            where: {
                email: signInDto.email
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordMatch = await comparePassword(signInDto.password, user.hash_password);
        if (!isPasswordMatch) {
            throw new Error('Invalid password');
        }
        const tokens:Tokens = await this.tokenService.generateToken(user);
        await this.updateRtHash(user.user_id, tokens.refreshToken);
        return tokens;
    }

    async logout(id: string): Promise<string> {
        // Check if the id is valid
        if (!id) {
            return 'Invalid user ID';
        }
        
        console.log('userid', id);
    
        // Perform the update if ID is valid
        const result = await this.prismaService.user.updateMany({
            where: {
                user_id: id,
                hash_refresh_token: { not: null }
            },
            data: { hash_refresh_token: null }
        });
    
        // Check if any rows were updated (affected rows > 0)
        if (result.count === 0) {
            return 'Unable to logout or user already logged out';
        }
    
        return 'Logout success';
    }
    
    async refreshToken(id: string): Promise<Tokens|string> {
        // Check if the id is valid
        if (!id) {
            throw new Error('Invalid user ID');
        }
    
        // Find the user with the given ID
        const user = await this.prismaService.user.findUnique({
            where: { user_id: id , hash_refresh_token: { not: null } }
        });
    
        // Check if the user exists
        if (!user) {
            return 'User not found or user already logout';
        }
    
        // Generate new tokens
        const tokens:Tokens = await this.tokenService.generateToken(user);
    
        // Update the refresh token hash in the database
        await this.updateRtHash(user.user_id, tokens.refreshToken);
    
        return tokens;
    }
}
