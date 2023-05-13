import { Router } from "express";
import { createExpense, getExpense, postExpense } from "../controllers/expenseControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get('/get-expense', verifyToken, getExpense)
router.post('/create-expense', verifyToken, createExpense);
router.post('/post-expense', verifyToken, postExpense);

export default router;