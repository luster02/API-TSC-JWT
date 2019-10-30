import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({

    created: {
        type: Date
    },
    title: {
        type: String,
        required : [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required'],    
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    image: {
        type: String,  
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }


});

postSchema.pre<IPost>('save', function(next){
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    title: String;
    description: String;
    content: String;
    image: String;
    user: String;
}

export const Post = model<IPost>('Post', postSchema);