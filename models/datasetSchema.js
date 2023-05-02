// Todo Schema
const mongoose = require('mongoose');


const datasetSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: false
  },
  dataset_name: {
    type: String,
    required: true
  },
  dataset_import_type: {
    type: Number,
    required: true,
    default: 1,
  },
  source_list_sto: {
    type: Number,
    required: false
  },
  image_location: {
    type: String,
    required: true
  },
  label_location: {
    type: String,
    required: true
  },
  kypt_id: {
    type: String,
    required: false
  },
  dataset_createDate: {
    type: Date,
    default: Date.now,
  },
  dataset_last_update: {
    type: Date,
    default: Date.now,
  }
});



// Add pre hook to log the document before saving
datasetSchema.pre('save', function (next) {
  console.log('Before saving the document:', this);
  next();
});

module.exports = mongoose.model('dataset', datasetSchema);
