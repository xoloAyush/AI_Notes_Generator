import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, // Capital 'S' and no quotes
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Good practice for emails
    },
    credits: {
        type: Number,
        default: 50,
        min: 0
    },
    isCreditAvailable: {
        type: Boolean,
        default: true
    },
    notes: {
        type: [mongoose.Schema.ObjectId],
        ref: "Notes",
        default: []
    }
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

// Don't forget to export the model so you can use it!
export const userModel = mongoose.model("userModel", userSchema);