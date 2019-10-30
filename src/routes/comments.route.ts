import { Router } from 'express';
import { verifyToken } from '../middlewares/authToken.midd';
import CommentController from '../controllers/comment.controller';

const commentController = new CommentController();
const router = Router();

router.post('/', [verifyToken], commentController.postComment);    

export default router;