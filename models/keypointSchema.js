// Todo Schema
const mongoose = require('mongoose');



const keypointSchema = new mongoose.Schema({
  kypt_id: { type: String, unique: true },
  kypt_name: {
    type: String,
    required: true
  },
  kypt_json: {
    type: Object,
    required: true
  },
  kypt_createDate: {
    type: Date,
    default: Date.now,
  },
  kypt_last_update: {
    type: Date,
    default: Date.now,
  }
});

// Add pre hook to log the document before saving
keypointSchema.pre('save', function (next) {
    console.log('Before saving the document:', this);
    next();
  });
  

module.exports = mongoose.model('keypoint', keypointSchema);