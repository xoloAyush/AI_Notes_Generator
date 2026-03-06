import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    topic: {
        type: String,
        required: true,
    },
    classLevel: String,
    examType: String,

    revisionMode: {
        type: Boolean,
        default: false,
    },
    includeDiagram: Boolean,
    includeChart: Boolean,

    credits: {
        type: Number,
        default: 50,
        min: 0
    },

    content: {
        type: mongoose.Schema.Types.Mixed, // allows object
        required: true
        // default: []
        // type: String,   // ✅ THIS IS THE FIX
        // required: true
    }
}, { timestamps: true });

const notesModel = mongoose.model("Notes", notesSchema);
export default notesModel;

