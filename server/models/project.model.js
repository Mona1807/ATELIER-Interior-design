const mongoose = require('mongoose');

/**
 * Project schema.
 *
 * Access control in this phase is intentionally simple: every project has
 * exactly one `owner`, and only that owner may read/update/delete it.
 * Team collaboration (inviting other members with roles like Admin,
 * Designer, Editor, Viewer) is a later phase - this schema does not yet
 * have a `members` array, by design, to avoid implementing that ahead of
 * schedule.
 */
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [2, 'Project name must be at least 2 characters'],
      maxlength: [100, 'Project name must be under 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description must be under 1000 characters'],
      default: '',
    },
    type: {
      type: String,
      required: [true, 'Project type is required'],
      enum: ['Residential', 'Commercial', 'Apartment', 'Office', 'Other'],
    },
    plotDimensions: {
      width: {
        type: Number,
        required: [true, 'Plot width is required'],
        min: [0, 'Plot width must be a positive number'],
      },
      length: {
        type: Number,
        required: [true, 'Plot length is required'],
        min: [0, 'Plot length must be a positive number'],
      },
      unit: {
        type: String,
        enum: ['ft', 'm'],
        default: 'ft',
      },
    },
    numberOfFloors: {
      type: Number,
      required: [true, 'Number of floors is required'],
      min: [1, 'A project must have at least 1 floor'],
      max: [200, 'Number of floors seems too high - check the value'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model('Project', projectSchema);
