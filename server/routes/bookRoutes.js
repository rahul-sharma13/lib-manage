import express from 'express';

import { addBook, allBooks, deleteBook, specificBook, updateBook } from '../controllers/bookControllers.js';

import{auth,authAdmin } from '../middlewares/authMiddleware.js'


const router = express.Router();

router.post('/add',auth,authAdmin,addBook);
router.put('/update/:bookId',auth,authAdmin,updateBook);
router.delete('/delete/:bookId',auth,authAdmin,deleteBook);
router.get('/all-books',auth,allBooks);
router.get('/:bookId',auth,specificBook);



export default router;