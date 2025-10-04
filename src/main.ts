import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({
    origin: '*',
    credentials: true,
  })

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3000)
}
void bootstrap()
