import { Schema, Document, model } from 'mongoose';

const commentSchema = new Schema({

    created: {
        type: Date
    },
    content: {
        type: String,
        required: [true, 'content of comment is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }, 
    post: {
        type: Schema.Types.ObjectId,
        ref:'Post',
        required: [true, 'post is required']
    }

});

commentSchema.pre<IComment>('save', function(next){
    this.created = new Date();
    next();
});

interface IComment extends Document {
    created: Date;
    content: string;
    post: string;
    user: string;
}

export const Comment = model<IComment>('Comment', commentSchema);

