import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { verifyToken } from '../middlewares/authToken.midd';

const postController = new PostController();
const router = Router();

router.post('/', [verifyToken], postController.postBlog);
router.get('/', postController.getBlogs);

export default router;