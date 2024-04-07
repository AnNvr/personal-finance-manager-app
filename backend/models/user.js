import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    roles: {
        User: {
            type: String,
            default: "Member",
            enum: ["Member", "Admin"]
        },
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String,
});

const User = mongoose.model("User", userSchema);

export default User;
