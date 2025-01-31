import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard'

@Module({
  imports: [
    ConfigModule, 
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRESIN') },
      }),
    }),
  ],
  providers: [AuthGuard], 
  exports: [JwtModule, AuthGuard], 
})
export class AuthModule {}
