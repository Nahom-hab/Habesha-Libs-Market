import express from 'express';
import { deleteProduct, getProduct, getAllProducts, updateProductViewCount, updateProduct, searchProduct, postProduct } from '../controller/product.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();


router.post('/post', verifyAdmin, postProduct)
router.put('/update/:id', verifyAdmin, updateProduct);
router.delete('/delete/:id', verifyAdmin, deleteProduct)
router.get('/get/:id', getProduct)
router.get('/get', getAllProducts)
router.get('/search', searchProduct)
router.put('/view/:id', updateProductViewCount);






export default router;
