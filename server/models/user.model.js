const mongoose = require('mongoose');

/**
 * User schema.
 *
 * NOTE on `role`: this is the user's system-level role (plain app user vs
 * platform admin). It is NOT the same as project-level roles
 * (Owner/Admin/Designer/Editor/Viewer) from the project brief - those are
 * per-project permissions and will be introduced when team collaboration
 * is implemented (not in this phase).
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name must be under 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // never returned by default in queries
    },
    profileImage: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// Defense in depth: even if a query forgets to exclude it, strip
// passwordHash whenever a User document is serialized to JSON.
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
