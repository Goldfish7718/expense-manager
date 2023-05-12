import { Router } from "express";
import { createExpense, postExpense } from "../controllers/expenseControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get('/create-expense', verifyToken, createExpense);
router.post('/post-expense', verifyToken, postExpense);

export default router;