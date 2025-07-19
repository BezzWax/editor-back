/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module'
// import { UsersModule } from './users/users.module'
// import { ArticlesModule } from './articles/articles.module'
// import { CommentsModule } from './comments/comments.module'

import * as dotenv from 'dotenv'
dotenv.config()

console.log('DB config:', {
  host: process.env.MONGO_URI,
})

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AuthModule,
  ],
})
export class AppModule {}
