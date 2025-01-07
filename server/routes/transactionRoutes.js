import express from 'express';

import { newTransaction,allTransactions } from '../controllers/transactionsControllers.js';

import{auth,authAdmin } from '../middlewares/authMiddleware.js'


const router = express.Router();

router.post('/new',auth,newTransaction);
router.get('/all',auth,authAdmin,allTransactions);


export default router;