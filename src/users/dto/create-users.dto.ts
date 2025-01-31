import { IsString, Length, IsEmail, IsStrongPassword, IsEnum, IsOptional } from "class-validator";

enum UserRole  {
      User = 'user',
      Admin = 'admin'
}

export class CreateUsersDTO {
    @IsString()
    @Length(3,12)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsEnum(UserRole)
    role?:string

    @IsOptional()
    img?:string
}
