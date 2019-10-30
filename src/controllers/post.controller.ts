import { Response } from 'express';
import { Post } from '../models/post.model';

export default class PostController {

    postBlog(req: any, res: Response){
        
        const body = req.body;
        body.user = req.user._id;

        Post.create(body).then( async postDB =>{

            await postDB.populate('user', '-password').execPopulate();

            res.json({
                ok: true,
                body: postDB
            });

        }).catch(err => {
            res.json({
                ok: false,
                error: err
            });
        });


    }
    async getBlogs(req:any, res: Response){

        let page = Number(req.query.page) || 1;
        let skip = page - 1;
        skip = skip * 5;
        
        const posts = await Post.find()
                                .sort({_id: -1})
                                .skip(skip)
                                .limit(5)
                                .populate('user', '-password')
                                .exec();
        
        res.json({
            ok:true,
            page: page,
            posts:posts
        })                                
    }

}