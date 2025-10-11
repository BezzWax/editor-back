import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article, ArticleDocument } from './articles.schema'
import { CreateArticleDto } from './dto/create-article.dto'

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async create(dto: CreateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(dto)
    return newArticle.save()
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec()
  }

  async findOne(id: string): Promise<Article | null> {
    return this.articleModel.findById(id).exec()
  }

  async findByAuthor(authorId: string): Promise<Article[]> {
    return this.articleModel.find({ author: authorId }).exec()
  }
}
