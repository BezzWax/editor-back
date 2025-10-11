import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Article } from '../articles/articles.schema'
import { User } from 'src/user/user.schema'

export type CommentDocument = Comment & Document

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  text: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User | Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Article', required: true })
  article: Article | Types.ObjectId
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
