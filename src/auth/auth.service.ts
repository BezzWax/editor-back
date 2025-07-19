import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../user/users.service'
import { UserDocument } from '../user/user.schema'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email)
    if (existing) throw new ConflictException('Email already in use')

    const hashed = await bcrypt.hash(dto.password, 10)
    const user: UserDocument = await this.usersService.create({
      email: dto.email,
      username: dto.username,
      password: hashed,
    })

    return this.signToken(user.id, user.email)
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isMatch = await bcrypt.compare(dto.password, user.password)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')

    return this.signToken(user.id, user.email)
  }

  private async signToken(userId: string, email: string) {
    const payload = { sub: userId, email }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
