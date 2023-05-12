import expenseBook from "../models/expenseSchema.js";

export const createExpense = async (req, res) => {

    try {
        const { userName } = req.decode;
        
        const newExpenseBook = new expenseBook({
            owner: userName
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
        const { amount, reference } = req.body;
        const { userName } = req.decode;

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

        const potentialUser = await expenseBook.findOne({ owner: userName })

        if (!potentialUser)
            return res
                .status(400)
                .json({ message: "User Doesn't exist" })

        const newentry = {
            amount,
            reference
        }

        potentialUser.expenses.push(newentry);
        await potentialUser.save();

        res
            .status(200)
            .json({ message: "New expense Added", newentry, userName });

     } catch (err) {
        console.log(err);
     }
}