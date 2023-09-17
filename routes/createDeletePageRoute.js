import express from 'express';
import { getAllPages, createPage, deletePage, getPageBySlug } from '../controllers/createDeletePageController.mjs'

const router = express.Router();

router.get('/', getAllPages);
router.get('/:slug', getPageBySlug);
router.post('/create', createPage);
router.delete('/:slug', deletePage);


export default router;