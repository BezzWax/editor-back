import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string

  @IsNotEmpty({ message: 'Имя пользователя обязательно' })
  @MinLength(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
  @MaxLength(20, { message: 'Имя пользователя должно содержать не более 20 символов' })
  username: string

  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(50, { message: 'Пароль слишком длинный' })
  password: string
}
