import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
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
            },
            balanceStamp: {
                type: Number
            }
        }
    ]
})

const expenseBook = mongoose.model('Expense', expenseSchema);

export default expenseBook;