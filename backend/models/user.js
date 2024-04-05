import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: String,
            default: "Member"
        },
        Admin: String
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

const User = mongoose.model('User', userSchema)

export default User