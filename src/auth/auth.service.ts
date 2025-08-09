/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
    const user = await this.usersService.create({
      email: dto.email,
      username: dto.username,
      password: hashed,
    })

    return this.buildAuthResponse(user)
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isMatch = await bcrypt.compare(dto.password, user.password)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')

    return this.buildAuthResponse(user)
  }

  private async signToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email }
    return this.jwtService.signAsync(payload)
  }

  private async buildAuthResponse(user: UserDocument) {
    const token = await this.signToken(user.id, user.email)
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    }
  }
}
