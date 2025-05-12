const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  recruiterID: {
    type: Schema.Types.ObjectId,
    ref: 'Recruiter',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  requirements: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one requirement is required'
    }
  },
  salary: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true
    }
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Remote'],
    default: 'Full-time'
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'],
    default: 'Mid Level'
  },
  numberOfPositions: {
    type: Number,
    required: true,
    min: 1
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
}, {
  timestamps: true
});

// Add text index for search functionality
jobSchema.index({
  title: 'text',
  description: 'text',
  requirements: 'text',
  company: 'text',
  location: 'text'
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;