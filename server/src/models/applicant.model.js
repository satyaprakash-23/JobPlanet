const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    seekerId: {
      type: Schema.Types.ObjectId,
      ref: "Seeker",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interviewing",
        "Rejected",
        "Hired",
        "Withdrawn",
      ],
      default: "Applied",
    },

    // Optional: Additional fields that might be useful
    coverLetter: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one application per job per seeker
applicationSchema.index({ seekerId: 1, jobId: 1 }, { unique: true });

// Index for frequently queried fields
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ seekerId: 1, status: 1 });

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
