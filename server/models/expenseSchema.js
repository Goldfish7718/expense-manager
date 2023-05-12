import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    expenses: [
        {
            amount: {
                type: Number,
            },
            reference: {
                type: String,
            }
        }
    ]
})

const expenseBook = mongoose.model('Expense', expenseSchema);

export default expenseBook;