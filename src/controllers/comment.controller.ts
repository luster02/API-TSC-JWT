import { Response } from 'express';
import { Comment } from '../models/comment.model';

export default class CommentController {

    postComment(req: any, res: Response){

        const body = req.body;
        body.user = req.user._id;
        body.post = req.query.idBlog

        Comment.create(body).then( async commentDB =>{
            
            await commentDB.populate('user', '-password').execPopulate()
            await commentDB.populate('post','-content').execPopulate();

            res.json({
                ok:true,
                body: commentDB,
            });

        }).catch(err => {
            res.json({
                ok: false,
                error: err
            });
        });


    }

}