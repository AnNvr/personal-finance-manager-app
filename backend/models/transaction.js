import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["income", "expense"],
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction;
