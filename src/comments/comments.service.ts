import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Comment, CommentDocument } from './comments.schema'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const comment = new this.commentModel(dto)
    return comment.save()
  }

  async findByArticle(articleId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ article: articleId })
      .populate('author', 'username email _id')
      .sort({ createdAt: -1 }) // последние сверху
      .exec()
  }
}
