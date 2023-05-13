import expenseBook from "../models/expenseSchema.js";
import User from '../models/userSchema.js';

export const getExpense = async (req, res) => {

    try {
        const { userName } = req.decode;

        const user = await User.findOne({ userName }).select('-password');

        if (!user)
            return res
                .status(401)
                .json({ message: "Please Login" });
        
        const userExpenseBook = await expenseBook.findOne({ owner: userName })

        res
            .status(200)
            .json({
                userData: {
                    user,
                    userExpenseBook
                }
            })
    } catch (err) {
        console.log(err);
    }
}

export const createExpense = async (req, res) => {

    try {
        const { balance, currency } = req.body;
        const { userName } = req.decode;
        
        const newExpenseBook = new expenseBook({
            owner: userName,
            balance,
            currency
        });
        
        await newExpenseBook.save();

        res
            .status(200)
            .json({ userName, newExpenseBook });
    } catch (err) {
        console.log(err);
    }
}

export const postExpense = async (req, res) => {
     try {

        // DESTRUCTURING PROPERTIES
        const { amount, reference } = req.body;
        const { userName } = req.decode;

        // USER INPUT VALIDATION
        const emptyData = !amount || !reference;
        const emptyUser = !userName;

        if (emptyData)
            return res
                .status(400)
                .json({ message: "Please input amount and reference" });

        if (emptyUser)
            return res
                .status(401)
                .json({ message: "Please Login" });

        const potentialExpenseBook = await expenseBook.findOne({ owner: userName })

        if (!potentialExpenseBook)
            return res
                .status(400)
                .json({ message: "Please initialize an expense book before adding an expense" })

        potentialExpenseBook.balance -= amount;
        const balanceStamp = potentialExpenseBook.balance;

        const newentry = {
            amount,
            reference,
            balanceStamp
        }

        potentialExpenseBook.expenses.push(newentry);
        await potentialExpenseBook.save();

        res
            .status(200)
            .json({ message: "New expense Added", newentry, userName });

     } catch (err) {
        console.log(err);
     }
}