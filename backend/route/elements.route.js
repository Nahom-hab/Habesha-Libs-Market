import express from 'express';
import { getElements, addElements, UpdateElements } from '../controller/elements.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();


router.get('/', getElements)
router.post('/add', verifyAdmin, addElements)
router.put('/update', verifyAdmin, UpdateElements);





export default router;
