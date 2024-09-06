import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {

        constructor(private readonly jwtService: JwtService) {}
    async generateToken(user:any) {
        const payload = { email: user.email,username:user.username, sub: user.user_id };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                { payload },
                {
                    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                    expiresIn: 60 * 15,
                },
            ),
            this.jwtService.signAsync(
                { payload },
                {
                    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                    expiresIn: 60 * 60 * 24 * 7,
                },
            ),
        ]);

        return {
            accessToken: at,
            refreshToken: rt,
        };
    }
}