// Import Express using ES modules syntax
import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import { getPages, getPageByID, renderPageBySlug, renderNewPage, deletePage } from '../controllers/createDeletePageController.js';

const router = express.Router();

// Define your routes in the correct order
router.get('/pages', getPages);
router.get('/new-page', authenticateJWT, renderNewPage);
router.get('/:slug', authenticateJWT, renderPageBySlug);
router.get('/pages/:id', getPageByID);
router.post('/delete-page', deletePage);

export default router;
