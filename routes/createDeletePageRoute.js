import express from 'express';
import { getAllPages, createPage, deletePage, getPageBySlug } from '../controllers/createDeletePageController.mjs'
import { authenticateJWT } from '../middlewares/authenticateJWT.js'; // Update the path and extension as needed

const router = express.Router();

router.get('/', authenticateJWT ,getAllPages);
router.get('/:slug',authenticateJWT, getPageBySlug);
router.post('/create',authenticateJWT, createPage);
router.delete('/:slug', authenticateJWT, deletePage);


export default router;