import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string

  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string
}
