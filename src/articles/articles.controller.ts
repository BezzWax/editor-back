/* eslint-disable @typescript-eslint/require-await */
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ArticlesService } from './articles.service'
import { CreateArticleDto } from './dto/create-article.dto'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() dto: CreateArticleDto): Promise<any> {
    return this.articlesService.create(dto)
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.articlesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.articlesService.findOne(id)
  }

  @Get('author/:authorId')
  async findByAuthor(@Param('authorId') authorId: string): Promise<any[]> {
    return this.articlesService.findByAuthor(authorId)
  }
}
